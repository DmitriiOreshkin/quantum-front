import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FiltersService {
    private search = new Subject();
    private filter = new Subject();

    listenFilterEvent() {
        return this.search;
    }

    listenSearchEvent() {
        return this.filter;
    }

    setSearch(value: string) {
        this.search.next(value);
    }
    setFilter(value: string) {
        this.filter.next(value);
    }

    constructor() {}
}
