from fastapi import FastAPI, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import io

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
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
        output_stream.seek(0)
        
        # Return as a downloadable file
        return StreamingResponse(
            output_stream,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="unlocked_{file.filename}"'}
        )
        
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
