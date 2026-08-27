import server from "./server";
import "dotenv/config";
import colors from "colors";
import { testConnection } from "./config";

const PORT = process.env.PORT || 4800;

testConnection();

server.listen(PORT, () => {
  console.log(colors.cyan.bold(`REST API corriendo el el puero ${PORT}`));
});
