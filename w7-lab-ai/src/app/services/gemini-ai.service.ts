import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GoogleGenerativeAI } from '@google/generative-ai'; 

@Injectable({
  providedIn: 'root'
})
export class GeminiAiService {
  private readonly MODEL_NAME = 'gemini-1.5-flash';
  
  async getImageAsBase64(imageUrl: string): Promise<string> {
    // Move image conversion code here
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const base64data = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    return base64data.split(',')[1];
  }

  async generateRecipe(imageBase64: string, prompt: string): Promise<string> {
    try {
      // 1. Create the AI client
      const genAI = new GoogleGenerativeAI(environment.apiKey);

      // 2. Get the model
      const model = genAI.getGenerativeModel({ model: this.MODEL_NAME });

      // 3. Call generateContent
      const result = await model.generateContent({
        contents: [{
          role: 'user',
          parts: [
            { 
              inlineData: { 
                mimeType: 'image/jpeg', 
                data: imageBase64
              } 
            },
            { text: prompt }
          ]
        }]
      });

      // 4. Return the response text
      return result.response.text();
    } catch (error) {
      throw new Error('Failed to generate recipe');
    }
  }
}