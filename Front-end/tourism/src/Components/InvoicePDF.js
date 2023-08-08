import React, { forwardRef, useEffect } from 'react';
import { Page, Document, StyleSheet, PDFViewer, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    color: 'black',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#1E88E5',
    padding: 10,
    color: 'white',
  },
  section: {
    marginBottom: 15,
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCellHeader: {
    width: '50%',
    padding: 8,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: '#000',
    backgroundColor: '#2196F3',
    color: 'white',
    fontWeight: 'bold',
  },
  tableCell: {
    width: '50%',
    padding: 8,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  total: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const InvoicePDF = forwardRef(({ invoiceData }, ref) => {
  useEffect(() => {
    // When invoiceData updates, you can use this to check the data in the console.
    console.log(invoiceData);
  }, [invoiceData]);

  return (
    <PDFViewer ref={ref} width="100%" height="500px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>Booking Summary</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCellHeader}>
                  <Text>Item</Text>
                </View>
                <View style={styles.tableCellHeader}>
                  <Text>Details</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Location ID:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.location_id}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Location Name:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.location_name}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Package ID:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.package_id}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Package Name:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.package_name}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Passenger IDs:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.passenger_id}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Number of Passengers:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.num_passengers}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Passenger Names:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.passenger_name}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Total Price:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.total_price}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Duration:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.duration}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Email:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.email}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Contact:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.contact}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                  <Text>Booking Date:</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{invoiceData?.booking_date}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.total}>
            <Text>Total Price: {invoiceData?.total_price}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
});

export default InvoicePDF;
