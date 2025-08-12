const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Log de todas las peticiones
    console.log(`📥 ${req.method} ${req.url}`);
    
    // Parsear la URL para obtener solo el pathname (sin query parameters)
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    let filePath = '.' + parsedUrl.pathname;
    
    // Default to index.html
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Ignorar peticiones de desarrollo (Vite, etc.)
    if (parsedUrl.pathname.startsWith('/@') || parsedUrl.pathname.includes('__vite') || parsedUrl.pathname.includes('hot-update')) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
    }
  
  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read and serve file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        console.log(`❌ 404 - Archivo no encontrado: ${filePath}`);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        // Server error
        console.log(`💥 500 - Error del servidor: ${error.message}`);
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
  console.log('📁 Sirviendo archivos desde:', __dirname);
  console.log('🔗 Abre http://localhost:8000 en tu navegador');
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
});