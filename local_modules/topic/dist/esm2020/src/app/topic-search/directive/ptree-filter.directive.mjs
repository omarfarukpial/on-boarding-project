import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class PtreeFilterDirective {
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.nodes = [];
    }
    set value(nodes) {
        this.nodes = nodes || [];
    }
    ngOnChanges() {
        setTimeout(() => this.disableFilter());
    }
    disableFilter() {
        const filterContainer = this.filterContainerElement;
        if (!filterContainer) {
            return;
        }
        const CLASS_IB_DISABLED = 'ib-disabled';
        filterContainer.classList.remove(CLASS_IB_DISABLED);
        if (!this.isAnyNodeSelectable()) {
            filterContainer.classList.add(CLASS_IB_DISABLED);
        }
    }
    get filterContainerElement() {
        return this.elemRef.nativeElement.querySelector('div.ui-tree-filter-container');
    }
    isAnyNodeSelectable() {
        return this.nodes.some(n => n.selectable);
    }
}
PtreeFilterDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: PtreeFilterDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
PtreeFilterDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.4.0", type: PtreeFilterDirective, selector: "[ptreeFilter]", inputs: { value: ["ptreeFilter", "value"] }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: PtreeFilterDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ptreeFilter]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { value: [{
                type: Input,
                args: ['ptreeFilter']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHRyZWUtZmlsdGVyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvdG9waWMtc2VhcmNoL2RpcmVjdGl2ZS9wdHJlZS1maWx0ZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUF5QixNQUFNLGVBQWUsQ0FBQzs7QUFNeEUsTUFBTSxPQUFPLG9CQUFvQjtJQU8vQixZQUE2QixPQUFtQjtRQUFuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBTHhDLFVBQUssR0FBZSxFQUFFLENBQUM7SUFLb0IsQ0FBQztJQUpwRCxJQUEwQixLQUFLLENBQUMsS0FBaUI7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFJRCxXQUFXO1FBQ1QsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTyxhQUFhO1FBQ25CLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQztRQUNwRCxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3BCLE9BQU87U0FDUjtRQUNELE1BQU0saUJBQWlCLEdBQUcsYUFBYSxDQUFDO1FBQ3hDLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO1lBQy9CLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDbEQ7SUFDSCxDQUFDO0lBRUQsSUFBWSxzQkFBc0I7UUFDaEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7aUhBL0JVLG9CQUFvQjtxR0FBcEIsb0JBQW9COzJGQUFwQixvQkFBb0I7a0JBSGhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCO2lHQUkyQixLQUFLO3NCQUE5QixLQUFLO3VCQUFDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkNoYW5nZXMsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcHRyZWVGaWx0ZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBQdHJlZUZpbHRlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgcHJpdmF0ZSBub2RlczogVHJlZU5vZGVbXSA9IFtdO1xuICBASW5wdXQoJ3B0cmVlRmlsdGVyJykgc2V0IHZhbHVlKG5vZGVzOiBUcmVlTm9kZVtdKSB7XG4gICAgdGhpcy5ub2RlcyA9IG5vZGVzIHx8IFtdO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBlbGVtUmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kaXNhYmxlRmlsdGVyKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBkaXNhYmxlRmlsdGVyKCkge1xuICAgIGNvbnN0IGZpbHRlckNvbnRhaW5lciA9IHRoaXMuZmlsdGVyQ29udGFpbmVyRWxlbWVudDtcbiAgICBpZiAoIWZpbHRlckNvbnRhaW5lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBDTEFTU19JQl9ESVNBQkxFRCA9ICdpYi1kaXNhYmxlZCc7XG4gICAgZmlsdGVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfSUJfRElTQUJMRUQpO1xuICAgIGlmICghdGhpcy5pc0FueU5vZGVTZWxlY3RhYmxlKCkpIHtcbiAgICAgIGZpbHRlckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKENMQVNTX0lCX0RJU0FCTEVEKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldCBmaWx0ZXJDb250YWluZXJFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2LnVpLXRyZWUtZmlsdGVyLWNvbnRhaW5lcicpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FueU5vZGVTZWxlY3RhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLm5vZGVzLnNvbWUobiA9PiBuLnNlbGVjdGFibGUpO1xuICB9XG5cbn1cbiJdfQ==