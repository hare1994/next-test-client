import {Component} from '@angular/core';
import {Movie} from "../../models/movie.model";
import {MoviesService} from "../../services/movies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-movies-container',
  templateUrl: './movies-container.component.html',
  styleUrls: ['./movies-container.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('300ms ease-in', style({opacity: 1})),
      ]),
    ]),
  ],
})
export class MoviesContainerComponent {
  movies: Movie[] = [];
  selectedMovie: Movie | null = null;
  currentPage: number = 1;
  pageSize: number = 10;
  totalMovies: number = 0;
  searchQuery: string = '';

  constructor(private movieService: MoviesService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = Number(params['page']) || 1;

      this.fetchMovies();
    });
  }

  searchMovieByName() {
    this.fetchMovies(true);
  }

  fetchMovies(fromSearch: boolean = false): void {
    const currentSearchQuery = this.searchQuery.length > 1 ? this.searchQuery : '';

    // If we came from the input keydown and also we have at least 2 chars - search and navigate to the first page
    if (currentSearchQuery && fromSearch) {
      this.currentPage = 1;
    }

    this.movieService.getMovies(this.currentPage, this.pageSize, currentSearchQuery).subscribe((data) => {
      this.router.navigate([], {queryParams: {page: this.currentPage}, queryParamsHandling: 'merge'});
      this.movies = this.parseMoviesData(data.results);
      this.totalMovies = data.total;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchMovies();
  }

  getNumberOfPages(): number {
    return Math.ceil(this.totalMovies / this.pageSize);
  }

  openModal(movie: any): void {
    this.selectedMovie = movie;
  }

  closeModal(): void {
    this.selectedMovie = null;
  }

  private parseMoviesData(data: any) {
    const currentPageMovies: Movie [] = data.map((item: { id: any; title: any; largeimage: any; released: any; rating: any; synopsis: any; runtime: any; }) => ({
      Id: item.id,
      Title: item.title,
      ImageUrl: item.largeimage,
      Runtime: item.runtime,
      Year: item.released,
      Rating: item.rating !== '' ? item.rating : '?',
      Description: item.synopsis
    }))

    return currentPageMovies;
  }
}
