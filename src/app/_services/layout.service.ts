import * as _ from "lodash";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LayoutService {
  get semanticColors(): string[] {
    return this._semanticColors;
  }

  private _semanticColors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
  ];

  constructor() {}

  /**
   * Ajusta la altura de la grid en base al tamaño del layout de fondo, sin contar el headerbar
   * @param idContainer - Id of the dashboard inner container
   * @param idGridContainerHeader - Id of the container card header
   * @param idGrid - Id of the grid to resize
   */
  adjustGridHeight(
    idContainer: string = "inner-container",
    idGridContainerHeader: string,
    idGrid: string
  ) {
    const layoutContainer: HTMLElement = document.getElementById(idContainer);
    const headerContainerElement: HTMLElement = document.getElementById(
      idGridContainerHeader
    );
    const gridElement: HTMLElement = document.getElementById(idGrid);
    const padding = 20; // in pixels

    gridElement.style.height =
      layoutContainer.offsetHeight -
      2 * padding -
      headerContainerElement.offsetHeight +
      "px";
  }

  /**
   * Devuelve un string que representa un color semántico de bootstrap, elegido aleatoriamente
   * @param excluded - Lista de colores semánticos excluidos de la lista
   */
  randomSemanticColor(excluded: string[] = []): string {
    const allowedColors = _.difference(this.semanticColors, excluded);
    return allowedColors[Math.floor(Math.random() * allowedColors.length)];
  }

  indexedSemanticColor(index: number, excluded: string[] = []): string {
    const allowedColors = _.difference(this.semanticColors, excluded);
    return allowedColors[index % allowedColors.length];
  }
}
