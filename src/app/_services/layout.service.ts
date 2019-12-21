import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LayoutService {
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
}
