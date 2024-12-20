import express from 'express';
import { EstateResolver } from './resolvers/estate.resolver';
import setupSwagger from './swagger';

const app = express();
const port = 3000;

const estates = new EstateResolver();
// Подключение Swagger
setupSwagger(app);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

/**
 * @swagger
 * /estates:
 *   get:
 *     summary: Retrieve a list of estates
 *     description: Returns a list of estates with optional query parameters for filtering.
 *     operationId: getEstates
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter estates by city
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter estates by type (e.g., apartment, house)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search estates by a keyword (e.g., part of the address or city name)
 *     responses:
 *       200:
 *         description: A list of estates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estate'
 * components:
 *   schemas:
 *     Estate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         type:
 *           type: string
 *         price:
 *           type: number
 *         currency:
 *           type: string
 */

app.get('/estates', (req, res) => {
  const params = req.query;
  const result = estates.getEstates(params);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  console.log(
    `Swagger JSON available at http://localhost:${port}/api-docs-json`
  );
});
