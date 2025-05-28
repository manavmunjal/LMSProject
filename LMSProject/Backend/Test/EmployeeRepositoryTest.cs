using Microsoft.EntityFrameworkCore;
using System.Net.Sockets;
using Moq;
using LMS.Models;
using LMS.Data;

namespace Test
{
    public class EmployeeRepositoryTest {
        
        //private List<LoanCardMaster> sampleLoans;
        private List<ItemMaster> sampleItems;
        private List<LoanCardMaster> sampleLoanCards;
        //IQueryable<LoanCardMaster> loanData;
        IQueryable<ItemMaster> itemData;
        IQueryable<LoanCardMaster> loanData;
        //Mock<DbSet<LoanCardMaster>> mockSet;
        Mock<DbSet<ItemMaster>> mockSet;
        Mock<DbSet<LoanCardMaster>> mockLoanCards;
        Mock<GisdbContext> mockAPIContext;
        EmployeeRepository empRepo;

        [SetUp]
        public void Setup()
        {
            sampleLoanCards =  new List<LoanCardMaster>() { new LoanCardMaster() { LoanId="L0002", LoanType="Furniture", DurationInYears=2, Valuation=5000 } };
            sampleItems = new List<ItemMaster>() { new ItemMaster { ItemId="I0001", ItemCategory="Furniture", IssueStatus="Y", ItemDescription="Table", ItemMake="Wood", ItemValuation=5000 } };
            //loanData = sampleLoans.AsQueryable();
            itemData=sampleItems.AsQueryable();
            loanData = sampleLoanCards.AsQueryable();

            mockSet = new Mock<DbSet<ItemMaster>>();
            mockLoanCards = new Mock<DbSet<LoanCardMaster>>();

            mockSet.As<IQueryable<ItemMaster>>().Setup(m => m.Provider).Returns(itemData.Provider);
            mockSet.As<IQueryable<ItemMaster>>().Setup(m => m.Expression).Returns(itemData.Expression);
            mockSet.As<IQueryable<ItemMaster>>().Setup(m => m.ElementType).Returns(itemData.ElementType);
            mockSet.As<IQueryable<ItemMaster>>().Setup(m => m.GetEnumerator()).Returns(itemData.GetEnumerator());

            mockLoanCards.As<IQueryable<LoanCardMaster>>().Setup(m => m.Provider).Returns(loanData.Provider);
            mockLoanCards.As<IQueryable<LoanCardMaster>>().Setup(m => m.Expression).Returns(loanData.Expression);
            mockLoanCards.As<IQueryable<LoanCardMaster>>().Setup(m => m.ElementType).Returns(loanData.ElementType);
            mockLoanCards.As<IQueryable<LoanCardMaster>>().Setup(m => m.GetEnumerator()).Returns(loanData.GetEnumerator());

            var p = new DbContextOptions<GisdbContext>();
            mockAPIContext = new Mock<GisdbContext>(p);
            mockAPIContext.Setup(x => x.ItemMasters).Returns(mockSet.Object);
            mockAPIContext.Setup(x => x.LoanCardMasters).Returns(mockLoanCards.Object);
            empRepo = new EmployeeRepository(mockAPIContext.Object);

        }

       /* [Test]

        public void GetLoanDeatilsById_Test()
        {
            List<LoanViewModel> res = empRepo.GetLoanDeatilsById("L0001");
            Assert.That(res[0].DurationInYears, Is.EqualTo(3));
        }*/

        [Test]

        public void GetItemsList_Test()
        {
            List<ItemMaster> res = empRepo.GetItemsList();
            Assert.That(res[0].ItemValuation, Is.EqualTo(5000));
        }

        [Test]
        public void GetLoansList_Test()
        {
            List<LoanCardMaster> res = empRepo.GetLoansList();
            Assert.That(res[0].LoanId, Is.EqualTo("L0002"));
        }
    }
}
