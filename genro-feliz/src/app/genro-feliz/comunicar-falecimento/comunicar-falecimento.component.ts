import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-comunicar-falecimento',
  standalone: true,
  imports: [RadioButtonModule, FormsModule, DropdownModule, InputTextModule],
  templateUrl: './comunicar-falecimento.component.html',
  styleUrl: './comunicar-falecimento.component.css',
  
})
export class ComunicarFalecimentoComponent {

  public selectedType: string = '';

}
