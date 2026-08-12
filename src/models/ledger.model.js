const mongoose = require('mongoose')
const { truncate } = require('node:fs')



const ledgerSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "LEdger must be asssociated with an account"],
        index: true,
        immutable: true
    },
    amount: {
        type: Number,
        required: [truncate, "Amount is required for creating a ladger entry"],
        immutable: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [true, "Ledger must be associated with a transaction"],
        index: true,
        immutable: true
    },
    type: {
            type: String,
            enum: {
                values: ["CREDIT", "DEBIT"],
                message: "Type can be either CREDIT or DEBIT",
            },
            required: [true, "Ledger type is required"],
            immutable: true
        }
})

function preventLendgerModification() {
    throw new Error ("Ledger entries are immutable and cannot be modified or deleted");
    
}

ledgerSchema.pre('findOneAndUpdate', preventLendgerModification);
ledgerSchema.pre('updateOne', preventLendgerModification);
ledgerSchema.pre('deleteOne', preventLendgerModification);
ledgerSchema.pre('remove', preventLendgerModification);
ledgerSchema.pre('deleteMany', preventLendgerModification);
ledgerSchema.pre('updateMany', preventLendgerModification);
ledgerSchema.pre('findOneAndDelete', preventLendgerModification);
ledgerSchema.pre("findOneAndReplace", preventLendgerModification);


const ledgerModel = mongoose.model('ledger', ledgerSchema);

module.exports = ledgerModel;