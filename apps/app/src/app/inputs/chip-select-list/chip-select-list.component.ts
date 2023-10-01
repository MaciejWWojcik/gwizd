import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from "@angular/material/chips";
import { OverlayModule } from "@angular/cdk/overlay";
import { MatIconModule } from "@angular/material/icon";
import { MatSelect, MatSelectChange, MatSelectModule } from "@angular/material/select";

export interface ChipSelectOption {
  key: string,
  value: string,
  chipIconSrc?: string
}

@Component({
  selector: 'app-chip-select-list',
  standalone: true,
  imports: [CommonModule, MatChipsModule, OverlayModule, MatIconModule, MatSelectModule],
  templateUrl: './chip-select-list.component.html',
  styleUrls: ['./chip-select-list.component.scss'],
})
export class ChipSelectListComponent {
  @Input({ required: true }) options: ChipSelectOption[];
  @Input() placeholder: string;
  @Input() selectedOption: ChipSelectOption;
  @Output() selectOptionChange = new EventEmitter<string>()

  @ViewChild('select') select: MatSelect;

  /**
   * Worst solution ever... But we don't have much time
   */
  @Input() set resetSelector(_: unknown) {
    this.setSelectedOption({} as MatSelectChange)
  }

  openSelectDialog() {
    this.select.toggle();
  }

  setSelectedOption(selectChange: MatSelectChange) {
    this.selectedOption = selectChange?.value;
    this.selectOptionChange.emit(this.selectedOption?.value ?? undefined)
  }
}
