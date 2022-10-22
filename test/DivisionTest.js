const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Quantity of Users', function () {
    let tokenContract
    let addr1, addr2, addr3, addr4, addr5
    let initialQuantityOfUsers = 3
    beforeEach(async function () {
        ;[owner, addr1, addr2, addr3, addr4, addr5, ...addrs] =
            await ethers.getSigners()

        const tokenFactory = await ethers.getContractFactory('Division')

        const owners = [addr2.address, addr3.address, addr4.address]

        tokenContract = await tokenFactory.deploy(owners)
        ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    })

    it('Check initial quantity of users', async function () {
        const qnt = await tokenContract.getDivisorsQuantity()
        expect(qnt).to.be.equals(initialQuantityOfUsers)
    })

    it('Check initial quantity of users After Add + 1', async function () {
        await tokenContract.addParticipant(addr5.address)
        const qnt = await tokenContract.getDivisorsQuantity()
        expect(qnt).to.be.equals(initialQuantityOfUsers + 1)
    })

    it('Check initial quantity of users After Add - 1', async function () {
        await tokenContract.blockParticipant(addr4.address)
        const qnt = await tokenContract.getDivisorsQuantity()
        expect(qnt).to.be.equals(initialQuantityOfUsers - 1)
    })
})

describe('Values of Users', function () {
    let tokenContract
    let addr1, addr2, addr3, addr4, addr5
    let initialQuantityOfUsers = 3
    beforeEach(async function () {
        ;[owner, addr1, addr2, addr3, addr4, addr5, ...addrs] =
            await ethers.getSigners()

        const tokenFactory = await ethers.getContractFactory('Division')

        const owners = [addr2.address, addr3.address, addr4.address]

        tokenContract = await tokenFactory.deploy(owners)
        ;[owner, addr1, addr2, ...addrs] = await ethers.getSigners()
    })

    it('Check value in contract', async function () {
        await addr1.sendTransaction({
            to: tokenContract.address,
            value: ethers.utils.parseEther('1'),
        })

        const valueInContract = await owner.provider.getBalance(
            tokenContract.address
        )
        expect(BigInt(1000000000000000000)).to.be.equals(valueInContract)
    })

    it('Check value of user', async function () {
        await addr1.sendTransaction({
            to: tokenContract.address,
            value: ethers.utils.parseEther('1'),
        })

        const valueAddr1Fulled = await tokenContract.connect(addr2).getBalance()
        expect(
            BigInt(1000000000000000000) / BigInt(initialQuantityOfUsers)
        ).to.be.equals(valueAddr1Fulled)
    })

    it('Check value of user after being removed', async function () {
        await addr1.sendTransaction({
            to: tokenContract.address,
            value: ethers.utils.parseEther('1'),
        })

        const valueAddr2Fulled = await tokenContract.connect(addr2).getBalance()
        expect(
            BigInt(1000000000000000000) / BigInt(initialQuantityOfUsers)
        ).to.be.equals(valueAddr2Fulled)

        await tokenContract.blockParticipant(addr2.address)

        const valueAddr2Zer = await tokenContract.connect(addr2).getBalance()

        expect(0).to.be.equals(valueAddr2Zer)

        const divisorsQnt = await tokenContract
            .connect(addr1)
            .getDivisorsQuantity()
        expect(BigInt(2)).to.be.equals(divisorsQnt)

        const valueAddr1 = await tokenContract.connect(addr1).getBalance()

        expect(
            BigInt(ethers.utils.parseEther('1')) / BigInt(divisorsQnt)
        ).to.be.equals(valueAddr1)
    })

    // it("Check value of user that was not removed after one being removed(shares of old user)", async function () {
    //   await addr1.sendTransaction({
    //     to: tokenContract.address,
    //     value: ethers.utils.parseEther("1"),
    //   });

    //   const valueAddr2Fulled = await tokenContract.getBalance(addr2.address);
    //   let eachInitialShare =
    //     BigInt(1000000000000000000) / BigInt(initialQuantityOfUsers);

    //   expect(eachInitialShare).to.be.equals(valueAddr2Fulled);

    //   await tokenContract.removeOwner(addr2.address);
    //   initialQuantityOfUsers -= 1;

    //   const valueAddr2Zer = await tokenContract.getBalance(addr2.address);
    //   expect(0).to.be.equals(valueAddr2Zer);

    //   const valueAddr3Full = await tokenContract.getBalance(addr3.address);
    //   expect(
    //     eachInitialShare + eachInitialShare / BigInt(initialQuantityOfUsers)
    //   ).to.be.equals(valueAddr3Full);
    // });
})
