import PyPDF2
import os
from dotenv import load_dotenv

load_dotenv()

def remove_pdf_password(input_pdf, output_pdf, password):
    try:
        # Open the encrypted PDF
        with open(input_pdf, "rb") as file:
            reader = PyPDF2.PdfReader(file)

            # Try to decrypt the PDF
            if reader.decrypt(password):
                writer = PyPDF2.PdfWriter()

                # Copy all pages to a new PDF (without password)
                for page in range(len(reader.pages)):
                    writer.add_page(reader.pages[page])

                # Save the new PDF
                with open(output_pdf, "wb") as new_file:
                    writer.write(new_file)

                print(f"Password removed! Saved as: {output_pdf}")
            else:
                print("Incorrect password or failed to decrypt.")
    except Exception as e:
        print(f"Error: {e}")

# Example usage
input_pdf = "bank_statement.pdf"  # Replace with your file
output_pdf = "unlocked.pdf"
password = os.getenv("PDF_PASSWORD")

remove_pdf_password(input_pdf, output_pdf, password)
