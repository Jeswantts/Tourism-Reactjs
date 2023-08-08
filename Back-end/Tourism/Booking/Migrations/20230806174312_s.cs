using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Booking.Migrations
{
    /// <inheritdoc />
    public partial class s : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "checkin",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "checkout",
                table: "bookings");

            migrationBuilder.RenameColumn(
                name: "room_id",
                table: "bookings",
                newName: "num_passengers");

            migrationBuilder.RenameColumn(
                name: "hotel_id",
                table: "bookings",
                newName: "location_id");

            migrationBuilder.AddColumn<long>(
                name: "contact",
                table: "bookings",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "duration",
                table: "bookings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "location_name",
                table: "bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "package_name",
                table: "bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "passenger_id",
                table: "bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "passenger_name",
                table: "bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "total_price",
                table: "bookings",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "contact",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "duration",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "email",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "location_name",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "package_name",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "passenger_id",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "passenger_name",
                table: "bookings");

            migrationBuilder.DropColumn(
                name: "total_price",
                table: "bookings");

            migrationBuilder.RenameColumn(
                name: "num_passengers",
                table: "bookings",
                newName: "room_id");

            migrationBuilder.RenameColumn(
                name: "location_id",
                table: "bookings",
                newName: "hotel_id");

            migrationBuilder.AddColumn<DateTime>(
                name: "checkin",
                table: "bookings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "checkout",
                table: "bookings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
