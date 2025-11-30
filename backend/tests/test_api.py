import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Test the unlock API
test_file_path = os.path.join(os.path.dirname(__file__), 'bank_statement.pdf')
files = {'file': open(test_file_path, 'rb')}
password = os.getenv('TEST_PDF_PASSWORD', 'default_password')
data = {'password': password}

try:
    response = requests.post('http://localhost:8000/api/unlock', files=files, data=data)
    print(f'Status Code: {response.status_code}')

    if response.status_code == 200:
        print(f'Content-Disposition: {response.headers.get("Content-Disposition")}')
        output_file_path = os.path.join(os.path.dirname(__file__), 'test_unlocked.pdf')
        with open(output_file_path, 'wb') as f:
            f.write(response.content)
        print(f'Success! File saved as {output_file_path}')
    else:
        print(f'Error: {response.text}')
except Exception as e:
    print(f'Exception: {e}')
