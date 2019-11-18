import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recommended } from "@app/_models/recommended";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { map } from "rxjs/operators";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class RecommendedService {
  constructor(private http: HttpClient) {}

  public get = (
    showDisabled: boolean,
    showDeleted: boolean
  ): Observable<Recommended[]> => {
    return this.http
      .get<Recommended[]>(
        `${environment.apiUrl}/recommended/get/${showDisabled}/${showDeleted}`
      )
      .pipe(
        map(recommendations =>
          recommendations.map(recommendation => ({
            ...recommendation,
            audit: {
              ...recommendation.audit,
              createdAt: moment(recommendation.audit.createdAt),
              updatedAt: moment(recommendation.audit.updatedAt)
            }
          }))
        )
      );
  };

  public create = (recommended: Recommended): Observable<Recommended> => {
    const createdRecommendation = {
      title: recommended.title,
      description: recommended.description,
      imageUrl: recommended.imageUrl
    };

    return this.http
      .post<Recommended>(`${environment.apiUrl}/recommended/create`, {
        ...createdRecommendation
      })
      .pipe(
        map(recommendation => ({
          ...recommendation,
          audit: {
            ...recommendation.audit,
            createdAt: moment(recommendation.audit.createdAt),
            updatedAt: moment(recommendation.audit.updatedAt)
          }
        }))
      );
  };

  public update = (recommended: Recommended): Observable<any> => {
    const updatedRecommendation = {
      id: recommended.id,
      title: recommended.title,
      description: recommended.description,
      imageUrl: recommended.imageUrl
    };

    return this.http.put<Recommended>(
      `${environment.apiUrl}/recommended/update`,
      {
        ...updatedRecommendation
      }
    );
  };

  public remove = (recommended: Recommended): Observable<any> => {
    return this.http.delete<Recommended[]>(
      `${environment.apiUrl}/recommended/remove/${recommended.id}`
    );
  };

  public uploadImage = (fileData): Observable<any> => {
    const formData = new FormData();
    formData.append("uploaded-image", fileData);

    return this.http.post<File>(`${environment.apiUrl}/upload`, formData);
  };
}
