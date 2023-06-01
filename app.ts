import express from "express";
import { Routes } from "./controller/routes";


(async () =>{
try {
  const app = express();
  const port = process.env.PORT || 80;
 
  app.use(express.json());
  Routes(app);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
} catch(error){
  console.log('server error');
}
})();
