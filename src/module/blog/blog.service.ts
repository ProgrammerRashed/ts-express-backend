import QueryBuilder from '../../builder/queryBuilder'
import { IBlog } from './blog.interface'
import Blog from './blog.model'


const createBlog = async (payload: IBlog) => {
  const data = new Blog(payload)
  const result = await data.save()
  return result
}

const getBlogs = async (query: Record<string, unknown> ) => {
  const searchableFields = ["name", "startLocation", "locations"];
  const tours = new QueryBuilder(Blog.find(), query).search(searchableFields).filter().sort().paginate().select();

  const result = await tours.modelQuery;
  return result;
}

const getSingleBlog = async (id: string) => {
  const result = Blog.findById(id)
  return result
}

const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const result = Blog.findByIdAndUpdate(id, payload)
  return result
}

const deleteBlog = async (id: string) => {
  const result = Blog.findByIdAndDelete(id)
  return result
}


export const blogServices = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
}
