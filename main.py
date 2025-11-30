from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import io

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],  # Allow both Vite ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/unlock")
async def unlock_pdf(
    file: UploadFile,
    password: str = Form(...)
):
    try:
        # Read the uploaded file into memory
        content = await file.read()
        input_stream = io.BytesIO(content)
        
        reader = PyPDF2.PdfReader(input_stream)
        
        # Check if encrypted
        if reader.is_encrypted:
            if not reader.decrypt(password):
                raise HTTPException(status_code=400, detail="Incorrect password or failed to decrypt.")
        
        writer = PyPDF2.PdfWriter()
        
        # Copy pages
        for page in reader.pages:
            writer.add_page(page)
            
        # Write to output stream
        output_stream = io.BytesIO()
        writer.write(output_stream)
        
        # Get the bytes and create a new BytesIO for the response
        pdf_bytes = output_stream.getvalue()
        
        # Return as a downloadable file
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="unlocked_{file.filename}"'}
        )
        
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    import asyncio
    import sys
    
    # Fix for Windows asyncio connection reset error
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    
    uvicorn.run(app, host="0.0.0.0", port=8000)
