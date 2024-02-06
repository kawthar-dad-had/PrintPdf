var pdf = require("pdf-creator-node");

const ptp = require("pdf-to-printer");
const fs = require("fs");

menus = [{
    id:1,
    titre:"Pizza",
    quantity : 4,
    name: "Pizza fromage",
    note: "kawthar",
    custom: "custom"

},
{
    id:2,
    titre:"Burger",
    quantity : 4,
    name: "Pizza fromage",
    note: "kawthar",
    custom: "custom"

},
{
    id:3,
    titre:"Pizza 2",
    quantity : 4,
    name: "Pizza fromage",
    note: "kawthar",
    custom: "custom"

}]

const printReceipt = async (id, menus,type,tab,nombreDeCopies) => {
    const newmenus = await Promise.all(
      menus.map(async (e) => {
        let menuName = "Menu composé";
        if (e.id) {
          menuName = e.titre;
        } 
        // else {
        //   menuName = JSON.parse(e.custom).name
        //     ? JSON.parse(e.custom).name
        //     : "Menu composé";
        // }
        return {
          name: menuName,
          quantity: e.quantity,
          //note: e.note ? "Note : " + e.note : "",
          // custom: e.custom
          //   ? JSON.parse(e.custom)
          //       .ingredients.map((e) => `${e.quantity} x ${e.label}`)
          //       .join(", ")
          //   : "",
        };
      })
    );
    generatePDF(id, newmenus,type,tab,nombreDeCopies);
  };
  
  const generatePDF = (id, menus,type,tab,nombreDeCopies) => {
    var html = fs.readFileSync("./uploads/template.html", "utf8");
  
    var document = {
      html: html,
      data: {
        id: id,
        commandes: menus,
        type:type,
        tab:tab,
      },
      path: "./uploads/output.pdf",
      type: "pdf",
    };
  
    var options = {
      width: "3in",
      height: "13in",
  
      // border: "3mm",s
    };
    pdf
      .create(document, options)
      .then(async (res) => {
        await pdfToPrint("./uploads/output.pdf",nombreDeCopies);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const pdfToPrint = async (lien , nombreDeCopies) => {
    const options = {};
    for (let i = 0; i < nombreDeCopies; i++) {
      await ptp.print(lien, options);
    }
  };

  printReceipt(1,menus,"menu composé","table 1",2)