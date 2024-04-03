import {Injectable} from "@angular/core";
import { Movie } from '../models/movie.model';

@Injectable(
   {providedIn: 'root'}
)
export class HelperService {
   constructor() {}

   sortByDate(movies: Movie[]): Movie[]{
      return movies.sort(function(a: Movie, b: Movie){
         let firstDateStr = a.Released;
         let secondDateStr = b.Released;
         if (firstDateStr == "N/A"){
            firstDateStr = "01 Jan 1500";
         }

         if (secondDateStr == "N/A"){
            secondDateStr = "01 Jan 1500";
         }

         return (+new Date(secondDateStr)) - (+new Date(firstDateStr));
       });
   }
}