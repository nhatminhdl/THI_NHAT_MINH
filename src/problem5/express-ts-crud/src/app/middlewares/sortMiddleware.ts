import {Request, Response, NextFunction} from "express"

export function sortMiddleware(req: Request,res: Response, next:NextFunction){
    res.locals._sort = {
        enabled: false,
        type:'default'
    }

    if(req.query.hasOwnProperty('_sort')){
        Object.assign(res.locals._sort,{
            enabled: true,
            type: req.query.type,
            column: req.query.column
        })
    }
    next();
}