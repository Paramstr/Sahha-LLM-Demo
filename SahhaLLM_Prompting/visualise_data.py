#!/usr/bin/env python3

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
from datetime import datetime
import json
from typing import Dict, List
import logging
from pathlib import Path
import argparse
import warnings

# Filter out specific matplotlib warnings
warnings.filterwarnings("ignore", category=UserWarning, module="matplotlib")

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class HealthMetricsVisualizer:
    def __init__(self, input_path: str = None):
        self.input_path = Path(input_path) if input_path else Path('./SahhaLLM_Prompting/output/healthkit_analysis.json')
        
        # Set style configurations
        #plt.style.use('seaborn')
        sns.set_theme(style="whitegrid")
        
        self.metric_types = [
            'HKQuantityTypeIdentifierStepCount',
            'HKQuantityTypeIdentifierDistanceWalkingRunning',
            'HKQuantityTypeIdentifierActiveEnergyBurned',
            'HKQuantityTypeIdentifierAppleExerciseTime',
            'HKQuantityTypeIdentifierFlightsClimbed'
        ]
        
        self.metric_names = {
            'HKQuantityTypeIdentifierStepCount': 'Steps',
            'HKQuantityTypeIdentifierDistanceWalkingRunning': 'Distance (km)',
            'HKQuantityTypeIdentifierActiveEnergyBurned': 'Energy (cal)',
            'HKQuantityTypeIdentifierAppleExerciseTime': 'Exercise (min)',
            'HKQuantityTypeIdentifierFlightsClimbed': 'Flights'
        }

    def load_data(self) -> Dict:
        try:
            with open(self.input_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading JSON file: {str(e)}")
            raise

    def prepare_dataframe(self, results: Dict) -> pd.DataFrame:
        all_data = []
        
        for day_data in results['data']:
            date = pd.to_datetime(day_data['date'])
            
            for metric_type in self.metric_types:
                hourly_data = day_data['metrics'][metric_type]
                
                for hour, value in hourly_data.items():
                    all_data.append({
                        'date': date,
                        'hour': int(hour),
                        'value': float(value),
                        'metric': self.metric_names[metric_type]
                    })

        df = pd.DataFrame(all_data)
        df['weekday'] = df['date'].dt.day_name()
        return df

    def plot_overview(self, df: pd.DataFrame) -> None:
        fig = plt.figure(figsize=(22, 16))
        fig.suptitle('Health Metrics Overview Analysis', size=16, y=0.95)
        
        # 1. Daily totals over time
        ax1 = plt.subplot(2, 2, 1)
        daily_totals = df.groupby(['date', 'metric'])['value'].sum().reset_index()
        daily_totals_pivot = daily_totals.pivot(index='date', columns='metric', values='value')
        normalized_totals = daily_totals_pivot.apply(lambda x: (x - x.min()) / (x.max() - x.min()))
        normalized_totals.plot(marker='o', ax=ax1)
        ax1.set_title('Normalized Daily Totals Over Time')
        ax1.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
        
        # 2. Hourly patterns
        ax2 = plt.subplot(2, 2, 2)
        hourly_avg = df.groupby(['hour', 'metric'])['value'].mean().reset_index()
        for metric in self.metric_names.values():
            metric_data = hourly_avg[hourly_avg['metric'] == metric]
            ax2.plot(metric_data['hour'], 
                    metric_data['value'] / metric_data['value'].max(),
                    marker='o', 
                    label=metric)
        ax2.set_title('Normalized Average Hourly Patterns')
        ax2.set_xlabel('Hour of Day')
        ax2.set_ylabel('Normalized Value')
        ax2.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
        ax2.grid(True)

        # 3. Activity heatmap
        ax3 = plt.subplot(2, 2, 3)
        pivot_data = df[df['metric'] == 'Steps'].pivot_table(
            values='value', 
            index=df['date'].dt.strftime('%Y-%m-%d'),
            columns='hour', 
            aggfunc='sum'
        )
        sns.heatmap(pivot_data, cmap='YlOrRd', ax=ax3)
        ax3.set_title('Step Count Heatmap (Hour vs Day)')
        ax3.set_xlabel('Hour of Day')
        ax3.set_ylabel('Date')

        # 4. Correlation matrix
        ax4 = plt.subplot(2, 2, 4)
        daily_totals_pivot = daily_totals.pivot(index='date', columns='metric', values='value')
        correlation_matrix = daily_totals_pivot.corr()
        sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0, ax=ax4)
        ax4.set_title('Metric Correlations')

        plt.subplots_adjust(top=0.92, bottom=0.08, left=0.08, right=0.85, hspace=0.25, wspace=0.35)
        plt.show()

    def plot_detailed_metrics(self, df: pd.DataFrame) -> None:
        fig, axes = plt.subplots(len(self.metric_types), 1, figsize=(15, 4*len(self.metric_types)))
        fig.suptitle('Detailed Daily Patterns by Metric', size=16, y=0.95)

        for idx, metric in enumerate(self.metric_names.values()):
            metric_data = df[df['metric'] == metric].copy()
            metric_data['hour'] = metric_data['hour'].astype(str)
            sns.boxplot(data=metric_data, x='hour', y='value', ax=axes[idx])
            axes[idx].set_title(f'{metric} Distribution by Hour')
            axes[idx].set_xlabel('Hour of Day')
            axes[idx].set_ylabel(metric)

        plt.subplots_adjust(hspace=0.4)
        plt.show()

    def plot_weekly_patterns(self, df: pd.DataFrame) -> None:
        fig, axes = plt.subplots(2, 1, figsize=(15, 12))
        fig.suptitle('Weekly Activity Patterns', size=16)

        weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        df['weekday'] = pd.Categorical(df['weekday'], categories=weekday_order, ordered=True)

        # Daily totals by weekday
        daily_totals = df.groupby(['weekday', 'metric'])['value'].sum().reset_index()
        sns.barplot(data=daily_totals, x='weekday', y='value', hue='metric', ax=axes[0])
        axes[0].set_title('Total Activity by Weekday')
        axes[0].tick_params(axis='x', rotation=45)
        
        # Hourly patterns by weekday
        hourly_avg = df.groupby(['weekday', 'hour', 'metric'])['value'].mean().reset_index()
        pivot_data = hourly_avg[hourly_avg['metric'] == 'Steps'].pivot(
            index='weekday',
            columns='hour',
            values='value'
        )
        sns.heatmap(pivot_data, ax=axes[1], cmap='YlOrRd')
        axes[1].set_title('Average Hourly Steps by Weekday')
        
        plt.tight_layout()
        plt.show()

    def visualize(self) -> None:
        try:
            logger.info(f"Loading data from {self.input_path}")
            results = self.load_data()
            
            logger.info("Preparing data for visualization")
            df = self.prepare_dataframe(results)
            
            logger.info("Generating overview plots")
            self.plot_overview(df)
            
            logger.info("Generating detailed metric plots")
            self.plot_detailed_metrics(df)
            
            logger.info("Generating weekly pattern plots")
            self.plot_weekly_patterns(df)
            
        except Exception as e:
            logger.error(f"Error during visualization: {str(e)}")
            raise

def main():
    parser = argparse.ArgumentParser(description='Visualize HealthKit metrics from JSON file')
    parser.add_argument('--input', '-i', type=str, help='Input JSON file path')
    
    args = parser.parse_args()
    
    visualizer = HealthMetricsVisualizer(input_path=args.input)
    visualizer.visualize()

if __name__ == "__main__":
    main()