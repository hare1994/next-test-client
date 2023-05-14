import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiUrl = 'http://localhost:3000/movies';

  constructor(private http: HttpClient) {
  }

  getMovies(page: number, pageSize: number, search: string = ''): Observable<any> {
    const storageKey = `movies_page_${page}`;
    const cachedMovies = localStorage.getItem(storageKey);

    // cache only by pages, not for search
    if (search.trim() === '' && cachedMovies) {
      return of(JSON.parse(cachedMovies));
    }

    let params = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize))
      .set('search', search);

    return this.http.get<any>(this.apiUrl, {params}).pipe(
      map(response => {
        if (search.trim() === '') {
          localStorage.setItem(storageKey, JSON.stringify(response));
        }
        return response;
      }));
  }
}
