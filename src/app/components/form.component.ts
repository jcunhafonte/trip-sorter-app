import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SortingEnum} from '../enums/sorting.enum';

const LABEL_FROM = 'From *';
const LABEL_TO = 'To *';
const LABEL_CHEAPEST = 'Cheapest';
const LABEL_FASTEST = 'Fastest';
const LABEL_SEARCH = 'Search';
const IDENTIFIER_SORTING = 'sorting';
const IDENTIFIER_FROM = 'from';
const IDENTIFIER_TO = 'to';
const THEME_BASIC = 'basic';
const THEME_ACCENT = 'accent';

export interface FormValue {
  from: string;
  to: string;
  sorting: SortingEnum;
}

interface FormViewValues {
  from: string;
  to: string;
  sorting: {
    self?: string;
    cheapest: SortingEnum | string,
    fastest: SortingEnum | string
  };
  search?: string;
}

@Component({
  selector: 'ts-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input()
  cities: string[];

  @Output()
  submit: EventEmitter<FormValue> = new EventEmitter<FormValue>();

  form: FormGroup;

  labels: FormViewValues = {
    from: LABEL_FROM,
    to: LABEL_TO,
    sorting: {
      cheapest: LABEL_CHEAPEST,
      fastest: LABEL_FASTEST
    },
    search: LABEL_SEARCH
  };

  identifiers: FormViewValues = {
    from: IDENTIFIER_FROM,
    to: IDENTIFIER_TO,
    sorting: {
      self: IDENTIFIER_SORTING,
      cheapest: SortingEnum.Cheapest,
      fastest: SortingEnum.Fastest
    }
  };

  ngOnInit() {
    this.setForm();
  }

  getCities(type: string): string[] {
    if (!this.cities) {
      return;
    }

    const from: string = this.form.get(this.identifiers.from).value;
    const to: string = this.form.get(this.identifiers.to).value;
    let cities: string[] = this.cities;

    if (type === this.identifiers.from && to) {
      cities = this.cities.filter((city: string) => city !== to);
    } else if (type === this.identifiers.to && from) {
      cities = this.cities.filter((city: string) => city !== from);
    } else {
      cities = this.cities;
    }

    return cities;
  }

  getButtonSortColor(type: SortingEnum): string {
    const sortingValue: SortingEnum = this.form.get(this.identifiers.sorting.self).value;
    return sortingValue === type ? THEME_ACCENT : THEME_BASIC;
  }

  setForm(): void {
    this.form = new FormGroup({
      [this.identifiers.from]: new FormControl('', Validators.required),
      [this.identifiers.to]: new FormControl('', Validators.required),
      [this.identifiers.sorting.self]: new FormControl(SortingEnum.Cheapest)
    });
  }

  onSort(type: SortingEnum): void {
    this.form.get(IDENTIFIER_SORTING).setValue(type);
  }

  onSubmit(event: Event): void {
    event.stopPropagation();

    this.submit.emit(this.form.value);
  }

  isDisabled(): boolean {
    return this.form.invalid;
  }
}
