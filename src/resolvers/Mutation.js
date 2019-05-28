const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Mutations = {
    //TODO check authorization
    async createItem(parent, args, ctx, info) {
        const item = await ctx.db.mutation.createItem({ data: { ...args } }, info)

        return item
    },

    async updateItem(parent, args, ctx, info) {
        let changes = { ...args }
        delete changes.id

        const res = await ctx.db.mutation.updateItem({
            data: changes,
            where: {
                id: args.id
            }
        }, info)

        return res
    },

    async deleteItem(parent, args, ctx, info){
        const where = { id: args.id }
        //find the item
        const item = await ctx.db.query.item({ where }, `{ id title }`)
        //verify if the user has auth to delete items and to delete this item
        // TODO
        //delete the item
        return ctx.db.mutation.deleteItem({ where }, info)
    },

    async signup(parent, args, ctx, info) {
        let newUser = {}
        newUser.email = args.email.toLowerCase()
        newUser.password = await bcrypt.hash(args.password, 10)
        newUser.name = args.name

        const result = await ctx.db.mutation.createUser({
            data: {
                ...newUser,
                permissions: { set: ['USER'] },
            }
        }, info)
        const token = jwt.sign({ userId: result.id }, process.env.APP_SECRET)

        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365, //year cookie
        })

        return result
    }
};

module.exports = Mutations;
