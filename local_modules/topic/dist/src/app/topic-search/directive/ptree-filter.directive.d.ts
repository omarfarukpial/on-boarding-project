import { OnChanges, ElementRef } from '@angular/core';
import { TreeNode } from 'primeng/api';
import * as i0 from "@angular/core";
export declare class PtreeFilterDirective implements OnChanges {
    private readonly elemRef;
    private nodes;
    set value(nodes: TreeNode[]);
    constructor(elemRef: ElementRef);
    ngOnChanges(): void;
    private disableFilter;
    private get filterContainerElement();
    private isAnyNodeSelectable;
    static ɵfac: i0.ɵɵFactoryDeclaration<PtreeFilterDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PtreeFilterDirective, "[ptreeFilter]", never, { "value": "ptreeFilter"; }, {}, never>;
}
