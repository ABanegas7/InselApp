var express = require('express');
var apirouter = express.Router();

function api(db){
    //Colecciones
    var clientes = db.collection("Clientes");
    var productos = db.collection("Productos");
    //Rutas
    apirouter.get("/obtenerclientes",
        function(req, res){
            var query = {};
            clientes.find(query).toArray(function(err, vClintes){
                if(err){
                    res.status(500).json({"error":err});
                }else{
                    res.status(200).json({"clientes":vClintes});
                }
            }) // busqueda Clientes
        }
    ) // obtenerclientes
    apirouter.get("/obtenercliente/:cod",
        function(req, res){
            var query = {"cod": req.params.cod};
            clientes.findOne(query, function(err, doc){
                if(err){
                    res.status(500).json({"error":err});
                }else{
                    res.status(200).json({"cliente":doc});
                }
            });

        }
    ) // obtenerCliente

    apirouter.post("/obtenerusuario",
        function(req, res){
            //var query = {"cod": req.params.cod};
            clientes.findOne({$and:[{"usuario": req.body.txtUsu},{"contrasena": req.body.txtCont}]}, function(err, doc){
                if(doc==null){
                    //res.status(500).json({"error":err});
                    res.redirect("/");
                }else{
                    res.redirect("/inicio");
                    //res.status(200).json({"cliente":doc});
                }
            });

        }
    ) // obtenerusuario

    apirouter.post("/modificarcliente/:cod",
        function(req, res){
            var query = {"cod": req.params.cod};
            var upd = {"$set":{"nombre":req.body.nombre}};

            clientes.updateOne(query,upd,{w:1},function(err, doc){
                if(err){
                    res.status(500).json({"error":err});
                }else{
                    res.status(200).json({"cliente":doc});
                }
            });
        }
    ) // modificarcliente

    apirouter.put("/agregarcliente",
        function(req, res){
            console.log(req.body);
            var newcli = {};
            newcli.cod = req.body.cod;
            newcli.nombre = req.body.nombre;
            newcli.apellido = req.body.apellido;
            newcli.usuario = req.body.usuario;
            newcli.contrasena = req.body.contrasena;
            newcli.correo = req.body.correo;
            newcli.telefono = req.body.telefono;
            newcli.direccion = req.body.direccion;
            newcli.historial = "";
            clientes.insertOne(newcli, function(err, doc){
                if(err){
                    res.status(500).json({"error":err});
                }else{
                    res.status(200).json({"cliente":doc});
                }
            });
        }
    ) // agregarcliente
    apirouter.delete("/eliminarcliente/:cod",
        function(req, res){
            var query = {"cod": req.params.cod};
            clientes.deleteOne(query,{w:1},function(err, doc){
                if(err){
                    res.status(500).json({"error":err});
                }else{
                    res.status(200).json({"cliente":doc});
                }
            } );
        }
    ) // eliminarcliente

// Productos
apirouter.get("/obtenerproductos",
    function(req, res){
        var query = {};
        productos.find(query).toArray(function(err, vproductos){
            if(err){
                res.status(500).json({"error":err});
            }else{
                res.status(200).json({"Productos":vproductos});
            }
        }) // busqueda Clientes
    }
) // obtenerproductos
apirouter.put("/agregarproducto",
    function(req, res){
        console.log(req.body);
        var newpro = {};
        newpro.codp = req.body.codp;
        newpro.nombre = req.body.nombre;
        newpro.des = req.body.des;
        newpro.precio = req.body.precio;
        newpro.existencia = req.body.existencia;
        productos.insertOne(newpro, function(err, doc){
            if(err){
                res.status(500).json({"error":err});
            }else{
                res.status(200).json({"producto":doc});
            }
        });
    }
) // agregarproducto

    return apirouter;
}

module.exports = api;
