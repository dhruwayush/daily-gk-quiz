const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const quizRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});

// Routes
app.use("/api", quizRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("Daily GK Quiz Backend is running!");
});

app.get("/privacy-policy", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Privacy Policy - Daily GK Quiz</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f4f4f9; }
            .container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; }
            h2 { color: #34495e; margin-top: 30px; }
            p { margin-bottom: 15px; }
            .footer { margin-top: 40px; font-size: 0.9em; color: #7f8c8d; text-align: center; border-top: 1px solid #ecf0f1; padding-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Privacy Policy</h1>
            <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString()}</p>
            
            <p>We at <strong>Daily GK Quiz</strong> respect your privacy. This app is designed to provide educational content without compromising your personal data.</p>

            <h2>1. Data Collection</h2>
            <p>We do <strong>not</strong> collect, store, or share any personally identifiable information (PII) such as your name, email, phone number, or location.</p>

            <h2>2. Quiz Data</h2>
            <p>Your quiz progress and scores are stored temporarily on your device for the duration of the session. We do not track your performance history on any external servers.</p>

            <h2>3. Third-Party Services</h2>
            <p>The app currently does not use any third-party analytics or advertising services that track user data.</p>
            
            <h2>4. Children's Privacy</h2>
            <p>Our services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>

            <h2>5. Government Disclaimer</h2>
            <p><strong>This app does not represent a government entity.</strong> We are not affiliated with, endorsed by, or connected to the Government of India, UPSC, SSC, or any other official body. All information relevant to government exams is provided strictly for educational and practice purposes.</p>

            <h2>6. Information Sources</h2>
            <p>The questions in this app are generated using general knowledge and publicly available educational resources. We do not claim this information to be official government data.</p>

            <h2>7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:dhruwayush@gmail.com">dhruwayush@gmail.com</a></p>

            <div class="footer">
                &copy; ${new Date().getFullYear()} Daily GK Quiz. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Local:   http://localhost:${PORT}`);
    console.log(`Network: http://<your-ip-address>:${PORT}`);
});
