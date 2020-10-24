import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputDateComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDateComponent implements OnChanges, ControlValueAccessor {
    @Input() min: Date;

    _model: NgbDate;
    _min: NgbDate;
    propagateChange = (_: any) => { };
    constructor(private _cd: ChangeDetectorRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        const { min } = changes;
        if (min && min.currentValue) {
            this._min = this._toNgbDate(this.min);
            this._cd.detectChanges();
        }
    }

    onChange(value: NgbDate) {
        this.propagateChange(this._fromNgbDate(value));
    }

    writeValue(value: Date): void {
        if (value) {
            this._model = this._toNgbDate(new Date(value));
            this._cd.detectChanges();
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState?(isDisabled: boolean): void {
    }

    private _toNgbDate(date: Date): NgbDate {
        return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }

    private _fromNgbDate(date: NgbDate): Date {
        return new Date(date.year, date.month - 1, date.day);
    }
}
