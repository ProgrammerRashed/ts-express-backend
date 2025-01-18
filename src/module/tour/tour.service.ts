import QueryBuilder from '../../builder/queryBuilder'
import { ITour } from './tour.interface'
import Tour from './tour.model'

const createTour = async (payload: ITour) => {
  const data = new Tour(payload)
  const result = await data.save()
  return result
}

const getTours = async (query: Record<string, unknown> ) => {
  const searchableFields = ["name", "startLocation", "locations"];
  const tours = new QueryBuilder(Tour.find(), query).search(searchableFields).filter().sort().paginate().select();

  const result = await tours.modelQuery;
  return result;
}

const getSingleTour = async (id: string) => {
  const result = Tour.findById(id)
  return result
}

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const result = Tour.findByIdAndUpdate(id, payload)
  return result
}

const deleteTour = async (id: string) => {
  const result = Tour.findByIdAndDelete(id)
  return result
}


export const tourService = {
  createTour,
  getTours,
  getSingleTour,
  updateTour,
  deleteTour,
}
