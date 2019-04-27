const Mutations = {
    //TODO check authorization
    async createItem(parent, args, ctx, info) {
        const item = await ctx.db.mutation.createItem({ data: { ...args.data } }, info)

        return item
    }
};

module.exports = Mutations;
