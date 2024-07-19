// Primeiro importar de dentro do EXPRESS a função ROUTER
// exportar as rotas de uma maneira diferente
import { Router } from 'express';

import multer from 'multer';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';
import { CreateCategoryController } from '../../../modules/cars/useCases/createCategory/createCategoryController';
import { DeleteCategoryController } from '../../../modules/cars/useCases/deleteCategory/deleteCategoryController';

import {ImportCategoryController} from '../../../modules/cars/useCases/importCategory/importCategoryController';

import {ListCategoriesController} from '../../../modules/cars/useCases/listCategories/listCategoriesController';

// estou definindo o uso da funnção Router para categories
// posso fazer isso para as outras rotas a serem criadas ainda.
const categoriesRoutes = Router();


const upload = multer({ dest: "./tmp" });
// Iniciar e instanciar o repositorio para uso dentro deste arquivo.
//const categoriesRepository = new CategoriesRepository();


const createCategoryController = new  CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.use(ensureAuthenticate)
// aqui eu chamo a função de rota e defino o método a ser usado como post,
// para enviar dados para a tabela de categorias/categories.
categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.post("/import", upload.single("file"), importCategoryController.handle)
categoriesRoutes.get("/", listCategoriesController.handle)
categoriesRoutes.delete("/:id", deleteCategoryController.handle)

// fazer a exportação da rota para uso em outros arquivos.
export { categoriesRoutes }