#!/usr/bin/env python3
"""
Find files with more than 200 lines of code in the repository and save the results to a file.

This script walks through all files in the repository and counts lines of code,
ignoring empty lines and comments. It saves a list of files with more than 200
lines of actual code that should be considered for refactoring.
"""

import os
import sys
from pathlib import Path


def count_lines_of_code(filepath):
    """
    Count the lines of code in a file, ignoring empty lines and comments.
    """
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
        
        loc_count = 0
        in_multiline_comment = False
        
        for line in lines:
            stripped_line = line.strip()
            
            # Skip empty lines
            if not stripped_line:
                continue
                
            # Handle Python multiline comments
            if filepath.suffix.lower() in ['.py']:
                # Check for start of multiline comment
                if stripped_line.startswith('"""') or stripped_line.startswith("'''"):
                    if len(stripped_line) >= 3:
                        # Check if it's a multiline comment ending on the same line
                        if (stripped_line.count('"""') >= 2 or stripped_line.count("'''") >= 2) and \
                           not (stripped_line.startswith('"""') and len(stripped_line) > 3 and not stripped_line.endswith('"""')) and \
                           not (stripped_line.startswith("'''") and len(stripped_line) > 3 and not stripped_line.endswith("'''")):
                            loc_count += 1
                        else:
                            in_multiline_comment = not in_multiline_comment
                    else:
                        in_multiline_comment = not in_multiline_comment
                    continue
                    
                # Skip comment lines (but still count docstrings)
                if stripped_line.startswith('#') and not in_multiline_comment:
                    continue
            
            # Skip if inside multiline comment
            if in_multiline_comment:
                continue
                
            # For JavaScript/JSX, JSX, TS, TSX files
            elif filepath.suffix.lower() in ['.js', '.jsx', '.ts', '.tsx']:
                # Handle multiline comments
                if '/*' in stripped_line and '*/' not in stripped_line:
                    in_multiline_comment = True
                    continue
                elif '/*' in stripped_line and '*/' in stripped_line:
                    # Comment on same line
                    continue
                elif '*/' in stripped_line:
                    in_multiline_comment = False
                    continue
                    
                # Skip single-line comments
                if stripped_line.startswith('//'):
                    continue
            
            # For other text-based files, we'll be more lenient
            loc_count += 1
            
        return loc_count
    except Exception:
        # If there's an issue reading the file, return 0
        return 0


def find_large_files(directory, min_loc=200):
    """
    Find files with more than min_loc lines of code, avoiding node_modules and venv.
    """
    large_files = []
    directory_path = Path(directory)
    
    # Common extensions for code files
    code_extensions = {'.py', '.js', '.jsx', '.ts', '.tsx', '.java', '.cpp', '.c', '.h', '.cs', '.html', '.css', '.scss', '.json', '.yaml', '.yml', '.md'}
    
    for file_path in directory_path.rglob('*'):
        if file_path.is_file() and file_path.suffix.lower() in code_extensions:
            # Skip node_modules, venv, and other common directories
            if any(part in str(file_path).lower() for part in ['node_modules', 'venv', '__pycache__', '.git', '\\scripts\\']):
                continue
                
            loc = count_lines_of_code(file_path)
            if loc > min_loc:  # Changed to > to exclude 200 exactly
                large_files.append((file_path, loc))
                
    return large_files


def main():
    if len(sys.argv) > 1:
        directory = sys.argv[1]
        if not os.path.isdir(directory):
            print(f"Error: {directory} is not a valid directory")
            sys.exit(1)
    else:
        # Start from parent directory of scripts directory
        directory = Path(__file__).parent.parent
    
    print(f"Searching for files with more than 200 lines of code in {directory}")
    print("="*60)
    
    large_files = find_large_files(directory, 200)
    
    if large_files:
        print(f"Found {len(large_files)} file(s) with more than 200 lines of code:")
        print()
        for file_path, loc in sorted(large_files, key=lambda x: x[1], reverse=True):
            print(f"{loc:4d} lines - {file_path}")
        print()
        print("These files should be considered for refactoring.")
    else:
        print("No files with more than 200 lines of code found.")
    
    # Save results to a structured file containing only files with more than 200 lines
    output_file = Path(__file__).parent / "large_files_loc.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("Lines of Code Analysis - Files with More Than 200 Lines\n")
        f.write("=" * 60 + "\n")
        f.write(f"Directory analyzed: {directory}\n")
        f.write(f"Total files with more than 200 lines: {len(large_files)}\n\n")
        
        if large_files:
            f.write(f"{'LOC':>6} | File Path\n")
            f.write("-" * 70 + "\n")
            
            for file_path, loc in sorted(large_files, key=lambda x: x[1], reverse=True):
                f.write(f"{loc:6d} | {file_path}\n")
        else:
            f.write("No files with more than 200 lines of code were found.\n")
    
    print(f"\nDetailed results saved to {output_file}")


if __name__ == "__main__":
    main()