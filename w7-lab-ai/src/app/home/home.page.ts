import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, 
         IonGrid, IonRow, IonCol, IonCard, IonCardContent, 
         IonCardHeader, IonCardTitle, IonItem, IonLabel, 
         IonButton, IonIcon, IonProgressBar, IonText,
         IonRadioGroup, IonRadio, IonImg, IonTextarea,
         IonRippleEffect } from '@ionic/angular/standalone';
import { GeminiAiService } from '../services/gemini-ai.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    // TODO: Add all the Ionic components from the imports above
    // HINT: Copy each component name from the imports list
    CommonModule, 
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonProgressBar,
    IonText,
    IonRadioGroup,
    IonRadio,
    IonImg,
    IonTextarea,
    IonRippleEffect,
  ],
})
export class HomePage {
  prompt = 'Provide a recipe for these baked goods using european measurements.'; 
  output = '';
  isLoading = false;

  availableImages = [
    { url: 'assets/images/baked_goods_1.jpg', label: 'Baked Good 1' },
    { url: 'assets/images/baked_goods_2.jpg', label: 'Baked Good 2' },
    { url: 'assets/images/baked_goods_3.jpg', label: 'Baked Good 3' }
  ];

  selectedImage = this.availableImages[0].url;

  constructor(private geminiService: GeminiAiService) {}

  get formattedOutput() {
    return this.output.replace(/\n/g, '<br>');
  }

  selectImage(url: string) {
    this.selectedImage = url;
  }

  trackByUrl(index: number, item: any) {
    return item.url;
  }

  async onSubmit() {
    if (this.isLoading) return;
    this.isLoading = true;

    try {
      // Use service methods
      const base64Image = await this.geminiService.getImageAsBase64(this.selectedImage);
      this.output = await this.geminiService.generateRecipe(base64Image, this.prompt);
    } catch (e) {
      this.output = `Error: ${e instanceof Error ? e.message : 'Something went wrong'}`;
    }

    this.isLoading = false;
  }
}