const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('בדיקת תאימות לסקריפט הדרישות ', () => {
  test('הסקריפט רץ ויוצר קובץ פלט בהצלחה', (done) => {
    const pythonScript = path.join(__dirname, 'demandstest.py');
    const outputFile = path.join(__dirname, 'demandstest_output.txt');

    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

    const py = spawn('python', [pythonScript], {
      env: {
        ...process.env,
        filename: outputFile,
        line: 'http://localhost:4050',
      },
    });

    py.on('error', (err) => {
      done(err); 
    });

    py.on('exit', (code) => {
      try {
        expect(code).toBe(0);
        const exists = fs.existsSync(outputFile);
        expect(exists).toBe(true);

        const content = fs.readFileSync(outputFile, 'utf8');
        expect(content.length).toBeGreaterThan(20); 

        done();
      } catch (e) {
        done(e);
      }
    });
  }, 15000); 
});
