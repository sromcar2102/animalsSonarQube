import { BackendException } from '../exceptions/backend.exception';
import { HttpService } from './common/http.service';
import { UUID } from '../types/commons.type';
import { Vaccine } from '../models/vaccine.model';

export class VaccineService {
    endpoint = 'http://127.0.0.1:3000/vaccines';
    #vaccines: Map<UUID, Vaccine> = new Map();

    constructor(private readonly httpService: HttpService) { }

    get vaccines() {
        return this.#vaccines;
    }
    load(): Promise<Map<UUID, Vaccine>> {
        return this.httpService.get(this.endpoint)
            .then(vaccines => this.#vaccines = new Map(vaccines.map(vaccine => [vaccine.id, new Vaccine(vaccine)] )))
            .catch(_ => { throw new BackendException('Error: server unknown');  })
    }
}