#!/usr/bin/env python3

import tkinter as tk
from tkinter import ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
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
import textwrap

# Filter warnings
warnings.filterwarnings("ignore", category=UserWarning)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class HealthMetricsVisualizerGUI:
    def __init__(self, input_path: str = None):
        self.input_path = Path(input_path) if input_path else Path('SahhaLLM_Prompting/output/moderately_active_week_cardio.json')
        
        # Initialize main window
        self.root = tk.Tk()
        self.root.title("Health Metrics Visualization")
        self.root.state('zoomed')  # Maximize window
        
        
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
        
        # Load and prepare data
        self.results = self.load_data()
        self.df = self.prepare_dataframe(self.results)
        
        # Create tabs
        self.create_tabs()

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

    def create_tabs(self):
        # Create notebook for tabs
        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Create tabs
        self.analysis_tab = ttk.Frame(self.notebook)
        self.overview_tab = ttk.Frame(self.notebook)
        self.detailed_tab = ttk.Frame(self.notebook)
        self.weekly_tab = ttk.Frame(self.notebook)
        
        # Add tabs to notebook
        self.notebook.add(self.analysis_tab, text='Analysis')
        self.notebook.add(self.overview_tab, text='Overview')
        self.notebook.add(self.detailed_tab, text='Detailed Metrics')
        self.notebook.add(self.weekly_tab, text='Weekly Patterns')
        
        # Create content for each tab
        self.create_analysis_tab()
        self.create_overview_tab()
        self.create_detailed_tab()
        self.create_weekly_tab()

    def create_analysis_tab(self):
        # Create Text widget for analysis
        text_widget = tk.Text(self.analysis_tab, wrap=tk.WORD, font=('Courier', 15))
        text_widget.pack(fill='both', expand=True, padx=10, pady=10)
        
        # Add analysis content
        analysis_text = (
            "ACTIVITY PATTERNS:\n\n"
            f"{self.results['analysis']['activity_patterns']}\n\n"
            "CONSISTENCY:\n\n"
            f"{self.results['analysis']['consistency']}\n\n"
            "SUGGESTED IMPROVEMENTS:\n\n"
            f"{self.results['analysis']['improvements']}\n\n"
            "RECOMMENDATIONS:\n\n"
            f"Timing: {self.results['recommendations']['timing']}\n\n"
            f"Intensity: {self.results['recommendations']['intensity']}\n\n"
            f"Recovery: {self.results['recommendations']['recovery']}\n\n"
            f"Progression: {self.results['recommendations']['progression']}\n\n"
            f"Habits: {self.results['recommendations']['habits']}\n\n"
            "\nMETADATA:\n\n"
            f"Activity Level: {self.results['metadata']['activity_level']}\n"
            f"Exercise Type: {self.results['metadata']['exercise_type']}\n"
            f"Date Range: {self.results['metadata']['date_range']['start'][:10]} to "
            f"{self.results['metadata']['date_range']['end'][:10]}"
        )
        
        text_widget.insert('1.0', analysis_text)
        text_widget.config(state='disabled')  # Make read-only


    
    def create_overview_tab(self):
        fig = plt.figure(figsize=(15, 10))
        
        # Daily totals over time (top left)
        ax1 = plt.subplot(2, 2, 1)
        daily_totals = self.df.groupby(['date', 'metric'])['value'].sum().reset_index()
        daily_totals_pivot = daily_totals.pivot(index='date', columns='metric', values='value')
        normalized_totals = daily_totals_pivot.apply(lambda x: (x - x.min()) / (x.max() - x.min()))
        normalized_totals.plot(marker='o', ax=ax1)
        ax1.set_title('Normalized Daily Totals')
        ax1.legend(bbox_to_anchor=(1.05, 1), loc='upper left')
        
        # Correlation matrix (top right)
        ax2 = plt.subplot(2, 2, 2)
        # Calculate correlations between metrics
        correlation_data = daily_totals_pivot.corr()
        # Create heatmap with pastel blue-green colormap
        sns.heatmap(
            correlation_data,
            annot=True,  # Show correlation values
            cmap='Blues',  # Pastel purple to green colormap
            vmin=0,      # Minimum correlation value (since we know we have no negative values)
            vmax=1,      # Maximum correlation value
            ax=ax2
        )
        ax2.set_title('Metric Correlations')
       
      
        
        # Rest of your plots can go in positions 3 and 4
        # You can add them here if needed
        
        plt.tight_layout()
        
        canvas = FigureCanvasTkAgg(fig, self.overview_tab)
        canvas.draw()
        canvas.get_tk_widget().pack(fill='both', expand=True)

    def create_detailed_tab(self):
        fig, axes = plt.subplots(len(self.metric_types), 1, figsize=(15, 4*len(self.metric_types)))
        fig.suptitle('Detailed Daily Patterns by Metric', size=16, y=0.95)

        for idx, metric in enumerate(self.metric_names.values()):
            metric_data = self.df[self.df['metric'] == metric].copy()
            metric_data['hour'] = metric_data['hour'].astype(str)
            sns.boxplot(data=metric_data, x='hour', y='value', ax=axes[idx])
            axes[idx].set_title(f'{metric} Distribution by Hour')
            axes[idx].set_xlabel('Hour of Day')
            axes[idx].set_ylabel(metric)

        plt.tight_layout()
        
        canvas = FigureCanvasTkAgg(fig, self.detailed_tab)
        canvas.draw()
        canvas.get_tk_widget().pack(fill='both', expand=True)

    def create_weekly_tab(self):
        fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(15, 12))
        fig.suptitle('Weekly Activity Patterns', size=16)

        weekday_order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        self.df['weekday'] = pd.Categorical(self.df['weekday'], categories=weekday_order, ordered=True)

        daily_totals = self.df.groupby(['weekday', 'metric'])['value'].sum().reset_index()
        sns.barplot(data=daily_totals, x='weekday', y='value', hue='metric', ax=ax1)
        ax1.set_title('Activity Totals by Weekday')
        ax1.tick_params(axis='x', rotation=45)
        
        hourly_avg = self.df.groupby(['weekday', 'hour', 'metric'])['value'].mean().reset_index()
        pivot_data = hourly_avg[hourly_avg['metric'] == 'Steps'].pivot(
            index='weekday',
            columns='hour',
            values='value'
        )
        sns.heatmap(pivot_data, ax=ax2, cmap='YlOrRd')
        ax2.set_title('Average Hourly Steps by Weekday')
        
        plt.tight_layout()
        
        canvas = FigureCanvasTkAgg(fig, self.weekly_tab)
        canvas.draw()
        canvas.get_tk_widget().pack(fill='both', expand=True)

    def run(self):
        self.root.mainloop()

def main():
    parser = argparse.ArgumentParser(description='Visualize HealthKit metrics from JSON file')
    parser.add_argument('--input', '-i', type=str, help='Input JSON file path')
    
    args = parser.parse_args()
    
    app = HealthMetricsVisualizerGUI(input_path=args.input)
    app.run()

if __name__ == "__main__":
    main()