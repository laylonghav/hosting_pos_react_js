import * as XLSX from "xlsx";
import logo from "../../../assets/logo/logo.png";
import {
  Document,
  Image,
  Page,
  pdf,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/util/helper/format";
import { request } from "@/util/request/request";
import { Edit, PlusCircle, Search, SearchSlash, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

import { Buffer } from "buffer";
if (typeof window !== "undefined") window.Buffer = Buffer;

export default function SupplerPage() {
  const [supplier, setSupplier] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    website: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPDF, setIsOpenPDF] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [laoding, setLoading] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");
  const fetchingData = async () => {
    setLoading(true);
    const res = await request("supplier", "get");
    if (res) {
      console.log("Supplier Respone : ", res);
      setSupplier(res?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const tbl_head = [
    "Id",
    "Name",
    "Email",
    "Address",
    "Website",
    "Created at",
    "Updated at",
    "Actions",
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data : ", form);
    if (isEdit) {
      const res = await request(`supplier/${form.id}`, "put", form);
      if (res) {
        console.log("Updeted Supplier : ", res);
        fetchingData();
      }
      setIsEdit(false);
    } else {
      const res = await request("supplier", "post", form);
      if (res) {
        console.log("Create Supplier : ", res);
        fetchingData();
      }
    }

    setIsOpen(false);
    setForm({
      id: "",
      name: "",
      email: "",
      address: "",
      website: "",
    });
  };

  async function onDelete() {
    const res = await request(`supplier/${dataDelete?.id}`, "delete");
    if (res) {
      console.log("Deleted Supplier : ", res);
      setIsOpenDelete(false);
      fetchingData();
    }
  }

  const onEdit = (itemEdit) => {
    console.log("Item Edit : ", itemEdit);
    setForm(itemEdit);
    setIsOpen(true);
    setIsEdit(true);
  };

  const onExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(supplier);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Supplier List");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer]), "SupplierList.xlsx");
  };

  const onUploadExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        try {
          const res = await request("supplier/bulk", "post", {
            supplier: jsonData,
          });
          if (res) {
            console.log("Updeted Bulk Supplier : ", res);
            fetchingData();
          }
        } catch (error) {
          console.log(error);
        }
        console.log(jsonData);
      };

      reader.readAsBinaryString(file);
    }
  };

  const styles = StyleSheet.create({
    page: { flexDirection: "column", backgroundColor: "#f9f9f9", padding: 20 },
    header: {
      fontSize: 16,
      marginBottom: 5,
      textAlign: "center",
      fontWeight: "bold",
    },
    subHeader: {
      fontSize: 12,
      textAlign: "center",
      color: "#777",
      marginBottom: 5,
    },
    table: {
      display: "flex",
      flexDirection: "column",
      borderWidth: 1,
      borderColor: "#ddd",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      padding: 5,
    },
    tableHeader: {
      fontWeight: "bold",
      fontSize: 10,
      flex: 1,
      textAlign: "center",
      backgroundColor: "#f2f2f2",
    },
    tableCell: {
      fontSize: 8,
      flex: 1,
      textAlign: "center",
      paddingVertical: 8,
    },
    logo: { width: 60, height: 60, alignSelf: "center", borderRadius: 50 },
    footer: { marginTop: 20, fontSize: 10, textAlign: "center", color: "#777" },
  });

  const MyDocument = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.header}>Computer Science PUHAV</Text>
        <Text style={styles.subHeader}>Supplier Report</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            {["No", "Name", "Address", "Email", "Website"].map((head, idx) => (
              <Text key={idx} style={styles.tableHeader}>
                {head}
              </Text>
            ))}
          </View>

          {data?.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.address}</Text>
              <Text style={styles.tableCell}>{item.email}</Text>
              <Text style={styles.tableCell}>{item.website}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <h1>Supplier </h1>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placehoder="Search Supplier"
          />
          <Button
            onClick={async () => {
              setLoading(true);
              const res = await request(`supplier/search/?q=${query}`, "get");
              if (res) {
                setLoading(false);
                console.log("Search Supplier : ", res);
                setSupplier(res?.data);
              }
            }}
          >
            <Search />
          </Button>
          <Button
            onClick={() => {
              fetchingData();
            }}
          >
            <SearchSlash />
          </Button>

          <Button onClick={onExportExcel}>Export Excel</Button>

          <Label className={"py-2.5 px-3 border rounded-md"}>
            <div className="w-23">Uplaod Excel</div>
            <Input
              onChange={onUploadExcel}
              type={"file"}
              className={"hidden"}
            />
          </Label>

          <Button
            onClick={() => {
              setIsOpenPDF(true);
            }}
          >
            View PDF
          </Button>

          <Button
            onClick={async () => {
              try {
                const blob = await pdf(<MyDocument data={supplier} />).toBlob();
                saveAs(blob, "SupplierList.pdf");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            PDF Download
          </Button>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              <PlusCircle />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Update Supplier" : "Create Supplier"}
              </DialogTitle>
            </DialogHeader>
            <form action="" onSubmit={onSubmit}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <Label>Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Email</Label>
                  <Input
                    type={"email"}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Address</Label>
                  <Input
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Website</Label>
                  <Input
                    value={form.website}
                    onChange={(e) =>
                      setForm({ ...form, website: e.target.value })
                    }
                    placeholder="Website"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <div className="flex gap-5 ">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      setForm({
                        id: "",
                        name: "",
                        email: "",
                        address: "",
                        website: "",
                      });
                      setIsEdit(false);
                    }}
                    type="button"
                    variant={"outline"}
                  >
                    Close
                  </Button>
                  <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this Supplier ?
            </DialogTitle>
            <div className="flex justify-end mt-7">
              <div className="flex gap-5">
                <Button
                  onClick={() => {
                    setIsOpenDelete(false);
                    setDataDelete(null);
                  }}
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button onClick={onDelete} variant={"destructive"}>
                  Delete
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpenPDF} onOpenChange={setIsOpenPDF}>
        <DialogContent className={"max-w-5xl h-[90vh]"}>
          <DialogHeader>
            <DialogTitle>View PDF</DialogTitle>
          </DialogHeader>
          <div className="h-[80vh] overflow-hidden">
            {isOpenPDF && (
              <PDFViewer width={"100%"} height={"100%"}>
                <MyDocument data={supplier} />
              </PDFViewer>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <div className="mt-7">
        <Table>
          <TableHeader>
            <TableRow>
              {tbl_head.map((item, index) => (
                <TableHead key={index}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {laoding ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex justify-center mt-5">
                    <Spinner className={"size-10"} />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {supplier?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.email}</TableCell>
                    <TableCell>{item?.address}</TableCell>
                    <TableCell>
                      <a target="_blank" href={item?.website}>
                        {item?.website}
                      </a>
                    </TableCell>
                    <TableCell>{formatDate(item?.created_at)}</TableCell>
                    <TableCell>{formatDate(item?.updated_at)}</TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        <Button onClick={() => onEdit(item)}>
                          <Edit />
                        </Button>
                        <Button
                          onClick={() => {
                            setIsOpenDelete(true);
                            setDataDelete(item);
                          }}
                          variant={"destructive"}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
