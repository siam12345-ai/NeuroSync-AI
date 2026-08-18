const { GoogleGenAI } = require("@google/genai");
console.log("🔥 GEMINI PROVIDER FILE LOADED");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const askGemini = async (prompt) => {

    // ==========================
    // Input Validation
    // ==========================

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {

        
        return {
            success: false,
            provider: "Gemini",
            errorType: "INVALID_INPUT",
            response: "Unable to process an empty AI request."
        };

    }
    

    try {
      
 

        

  

    // Gemini Request
    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: prompt.trim()

    });
    

        // ==========================
        // Output Validation
        // ==========================

        

const aiText =
    typeof response?.text === "string"
        ? response.text.trim()
        : "";

        // Empty / Invalid AI Response
        if (!aiText) {

            console.error(
                "Gemini Error: Empty AI response."
            );

            return {
                success: false,
                provider: "Gemini",
                errorType: "EMPTY_RESPONSE",
                response: "NeuroSync AI could not generate a valid response."
            };

        }

        // ==========================
        // Successful Response
        // ==========================
        

        return {

            success: true,

            provider: "Gemini",

            errorType: null,

            response: aiText

        };

    }
    

    catch (error) {

        console.error(
            "Gemini Error:",
            error?.message || error
        );

        // ==========================
        // Error Classification
        // ==========================

        const status =
            error?.status ||
            error?.response?.status;

        const message =
            error?.message?.toLowerCase() || "";
            // Rate Limit

        // Rate Limit
        if (
            status === 429 ||
            message.includes("rate limit") ||
            message.includes("quota")
        ) {

            return {

                success: false,

                provider: "Gemini",

                errorType: "RATE_LIMIT",

                response:
                    "NeuroSync AI is temporarily busy. Please try again shortly."

            };

        }

        // Timeout
        
        if (
            message.includes("timeout") ||
            message.includes("timed out")
        ) {

            return {

                success: false,

                provider: "Gemini",

                errorType: "TIMEOUT",

                response:
                    "The AI request timed out. Please try again."

            };

        }

        // Network / Connection
        if (
            message.includes("network") ||
            message.includes("econn") ||
            message.includes("connection") ||
            message.includes("fetch failed")
        ) {

            return {

                success: false,

                provider: "Gemini",

                errorType: "NETWORK_ERROR",

                response:
                    "NeuroSync AI is temporarily unavailable. Please check your connection and try again."

            };

        }

        // Generic AI/API Error
        return {

            success: false,

            provider: "Gemini",

            errorType: "AI_SERVICE_ERROR",

            response:
                "NeuroSync AI is temporarily unavailable. Please try again later."

        };

    }

};

module.exports = {
    askGemini
};