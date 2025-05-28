using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LMS.Models;

public partial class GisdbContext : DbContext
{
    public GisdbContext()
    {
    }

    public GisdbContext(DbContextOptions<GisdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<EmployeeCardDetail> EmployeeCardDetails { get; set; }

    public virtual DbSet<EmployeeCredential> EmployeeCredentials { get; set; }

    public virtual DbSet<EmployeeIssueDetail> EmployeeIssueDetails { get; set; }

    public virtual DbSet<EmployeeMaster> EmployeeMasters { get; set; }

    public virtual DbSet<ItemMaster> ItemMasters { get; set; }

    public virtual DbSet<LoanCardMaster> LoanCardMasters { get; set; }

    public virtual DbSet<Material> Materials { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=WINDOWS-BVQNF6J;Database=gisdb;Trusted_Connection=True;Encrypt=false");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Category1).HasName("PK__categori__F7F53CC36D20D567");

            entity.ToTable("categories");

            entity.Property(e => e.Category1)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("category");
        });

        modelBuilder.Entity<EmployeeCardDetail>(entity =>
        {
            entity
                .ToTable("employee_card_details");

            entity.Property(e => e.CardIssueDate)
                .HasColumnType("date")
                .HasColumnName("card_issue_date");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_id");
            entity.Property(e => e.LoanId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("loan_id");

            entity.HasOne(d => d.Employee).WithMany()
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__employee___emplo__36B12243");

            entity.HasOne(d => d.Loan).WithMany()
                .HasForeignKey(d => d.LoanId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__employee___loan___37A5467C");
        });

        modelBuilder.Entity<EmployeeCredential>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__employee__C52E0BA82FC2978B");

            entity.ToTable("employee_credentials");

            entity.Property(e => e.EmployeeId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_id");
            entity.Property(e => e.EmployeePassword)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_password");
            entity.Property(e => e.EmployeeRole)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_role");
        });

        modelBuilder.Entity<EmployeeIssueDetail>(entity =>
        {
            entity.HasKey(e => e.IssueId).HasName("PK__employee__D6185C39A2A14B1D");

            entity.ToTable("employee_issue_details");

            entity.Property(e => e.IssueId)
                .HasMaxLength(6)
                .IsUnicode(false)
                .HasColumnName("issue_id");
            entity.Property(e => e.EmployeeId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_id");
            entity.Property(e => e.IssueDate)
                .HasColumnType("date")
                .HasColumnName("issue_date");
            entity.Property(e => e.ItemId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("item_id");
            entity.Property(e => e.ReturnDate)
                .HasColumnType("date")
                .HasColumnName("return_date");

            entity.HasOne(d => d.Employee).WithMany(p => p.EmployeeIssueDetails)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__employee___emplo__30F848ED");

            entity.HasOne(d => d.Item).WithMany(p => p.EmployeeIssueDetails)
                .HasForeignKey(d => d.ItemId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__employee___item___31EC6D26");
        });

        modelBuilder.Entity<EmployeeMaster>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__employee__C52E0BA8BC63B330");

            entity.ToTable("employee_master");

            entity.Property(e => e.EmployeeId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("employee_id");
            entity.Property(e => e.DateOfBirth)
                .HasColumnType("date")
                .HasColumnName("date_of_birth");
            entity.Property(e => e.DateOfJoining)
                .HasColumnType("date")
                .HasColumnName("date_of_joining");
            entity.Property(e => e.Department)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("department");
            entity.Property(e => e.Designation)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("designation");
            entity.Property(e => e.EmployeeName)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("employee_name");
            entity.Property(e => e.Gender)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("gender");

            entity.HasOne(d => d.Employee).WithOne(p => p.EmployeeMaster)
                .HasForeignKey<EmployeeMaster>(d => d.EmployeeId)
                .HasConstraintName("FK__employee___emplo__2E1BDC42");
        });

        modelBuilder.Entity<ItemMaster>(entity =>
        {
            entity.HasKey(e => e.ItemId).HasName("PK__item_mas__52020FDD8E8D511A");

            entity.ToTable("item_master");

            entity.Property(e => e.ItemId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("item_id");
            entity.Property(e => e.IssueStatus)
                .HasMaxLength(1)
                .IsUnicode(false)
                .HasColumnName("issue_status");
            entity.Property(e => e.ItemCategory)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("item_category");
            entity.Property(e => e.ItemDescription)
                .HasMaxLength(25)
                .IsUnicode(false)
                .HasColumnName("item_description");
            entity.Property(e => e.ItemMake)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("item_make");
            entity.Property(e => e.ItemValuation).HasColumnName("item_valuation");

            entity.HasOne(d => d.ItemCategoryNavigation).WithMany(p => p.ItemMasters)
                .HasForeignKey(d => d.ItemCategory)
                .HasConstraintName("FK__item_mast__item___29572725");

            entity.HasOne(d => d.ItemMakeNavigation).WithMany(p => p.ItemMasters)
                .HasForeignKey(d => d.ItemMake)
                .HasConstraintName("FK__item_mast__item___286302EC");
        });

        modelBuilder.Entity<LoanCardMaster>(entity =>
        {
            entity.HasKey(e => e.LoanId).HasName("PK__loan_car__A1F79554B593D706");

            entity.ToTable("loan_card_master");

            entity.Property(e => e.LoanId)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("loan_id");
            entity.Property(e => e.DurationInYears).HasColumnName("duration_in_years");
            entity.Property(e => e.LoanType)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("loan_type");
            entity.Property(e => e.Valuation).HasColumnName("valuation");

            entity.HasOne(d => d.LoanTypeNavigation).WithMany(p => p.LoanCardMasters)
                .HasForeignKey(d => d.LoanType)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__loan_card__loan___34C8D9D1");
        });

        modelBuilder.Entity<Material>(entity =>
        {
            entity.HasKey(e => e.Material1).HasName("PK__material__DEDA4344AA459D9D");

            entity.ToTable("materials");

            entity.Property(e => e.Material1)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("material");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
