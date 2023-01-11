import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Flights } from './flights.entity';
import { Flight } from './flight.model';
import { number } from 'yargs';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flights)
    private readonly flightRepository: Repository<Flights>,
  ) { }

  async create(flight: Flight): Promise<any> {
    return await this.flightRepository.save(flight);
  }

  async findOne(id: number): Promise<any> {
    return this.flightRepository.findOne({ where: { id: id } });
  }

  async findAll(): Promise<Flights[]> {
    return this.flightRepository.find();
  }

  async query(orig: string, dest: string): Promise<any> {
    return await this.flightRepository.find({ where: { origin: orig, destination: dest } });
  }

  async update(flight: Flight): Promise<UpdateResult> {
    return await this.flightRepository.update(flight.id, flight);
  }

  async delete(id: number): Promise<any> {
    return this.flightRepository.delete(id);
  }

  async getFlightOrigins(): Promise<String[]> {
    return this.flightRepository.query("SELECT DISTINCT origin FROM flights");
  }

  async getFlightDestinations(): Promise<String[]> {
    return this.flightRepository.query("SELECT DISTINCT destination FROM flights");
  }

}
