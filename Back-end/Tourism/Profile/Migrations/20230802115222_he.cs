﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Profile.Migrations
{
    /// <inheritdoc />
    public partial class he : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "agent",
                columns: table => new
                {
                    customer_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    agent_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    agency_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    agent_mobile = table.Column<long>(type: "bigint", nullable: true),
                    email_id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_agent", x => x.customer_id);
                });

            migrationBuilder.CreateTable(
                name: "profiles",
                columns: table => new
                {
                    customer_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dob = table.Column<DateTime>(type: "datetime2", nullable: true),
                    gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    marital_status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    mobile_number = table.Column<long>(type: "bigint", nullable: true),
                    email_id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_profiles", x => x.customer_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "agent");

            migrationBuilder.DropTable(
                name: "profiles");
        }
    }
}
