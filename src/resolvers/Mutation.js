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
    }
};

module.exports = Mutations;
