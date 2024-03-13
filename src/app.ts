import { AnimalController } from "./controllers/animal.controller"
import { AnimalDexieService } from "./services/animal-dexie.service";
import { AnimalFormView } from "./views/animal-form.view";
import { AnimalListView } from "./views/animal-list.view";
import { AnimalService } from "./services/animal.service";
import { AnimalStorageService } from "./services/animal-storage.service";
import { AnimalTableView } from './views/animal-table.view';
import { HttpService } from "./services/common/http.service";
import { VaccineService } from "./services/vaccine.service";

console.log('Hola');

const httpService = new HttpService();
const animalStorageService = new AnimalStorageService();
const animalDexieService = new AnimalDexieService();
const animalService: AnimalService = new AnimalService(httpService, animalStorageService, animalDexieService);
const vaccineService: VaccineService = new VaccineService(httpService);


const tableView: AnimalTableView = new AnimalTableView(); 
const animalListView: AnimalListView = new AnimalListView();
const formView: AnimalFormView = new AnimalFormView();

const select = document.querySelector('select');

const animalController: AnimalController = new AnimalController(animalService, vaccineService, tableView, formView);

select.addEventListener('change', () => {
    const view = select.value === "1" ? tableView: animalListView;
    animalController.view = view;
});