/* eslint-disable @next/next/no-img-element */
import { Button, MultiSelect, Select, TextInput } from '@mantine/core';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import styles from "../styles/leadsList.module.css"
import DataTable from "react-data-table-component"
import { ArrowDoubleLeft, ArrowDoubleRight, ArrowLeft, ArrowRight, DeleteIcon, SortIcon } from './Icon';

export default function LeadsList() { 
  const [leadlist, setleadlist] = useState<any>([])
  const [searchItem, setSearchItem] = useState<string>('');
  // status
  const [status, setStatus] = useState<any[]>([])
  const [statusValue, setStatusValue] = useState<any>([]);

  //source
  const [source, setSource] = useState<any[]>([])
  const [sourceValue, setSourceValue] = useState<any>([]);

  // assigne
  const [assigne, setAssigne] = useState<any[]>([])
  const [assigneValue, setAssigneValue] = useState<any>([]);

  const [value, setValue] = useState<DateRangePickerValue>([null , null]);

  const [pagination, setPagination] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true)

  const token = Cookies.get('token');

  // search lead handler
  const searchLeadsHandler = async (e: any) => {
    setSearchItem(e.target.value)
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/lead/list`, {
        search: e.target.value

    }, { 
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`
        },
    }).then((res: any) => {
        setleadlist(res.data.data.data)
        setPagination(res.data.data)
        setLoading(false)
    }).catch((err: any) => {
        console.log(err)
    })
  }

  // leads list fetch with page loading
  const fetchData = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/lead/list`, {
            search: '',
            lead_status_id: [],
            source_id: [],
            user_id: [],
            contacted_date_from: [],
            contacted_date_to: [],

        }, { 
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`
            },
        }).then((res: any) => {
            setleadlist(res.data.data.data)
            setPagination(res.data.data)
            setLoading(false)
        }).catch((err: any) => {
            console.log(err)
        })
  }

  useEffect(() => {
    const getStatusHandler = async () => {
        // status data
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/base/lead-status`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }).then((res) => {
            if(res.data.data){
                setStatus(
                    res.data.data.map((item: any)=> {
                        return {
                            value: item.id,
                            label: item.name
                        }
                }));
            }
        }).catch(err => {
            console.log(err);
        })

        // get source
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/base/source`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }).then((res) => {
            if(res.data.data){
                setSource(
                    res.data.data.map((item: any)=> {
                        return {
                            value: item.id,
                            label: item.name
                        }
                }));
            }
        }).catch(err => {
            console.log(err);
        })

        // get assigne
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/base/assignee`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}` 
            }
        }).then((res) => {
            if(res.data.data){
                setAssigne(
                    res.data.data.map((item: any)=> {
                        return {
                            value: item.id,
                            label: item.name
                        }
                }));
            }
        }).catch(err => {
            console.log(err);
        })
    }
    getStatusHandler()
    fetchData();
  }, [token])
  
  // filter handler
  const leadsHanlder = async (e: any) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/lead/list`, {
        search: '',
	    lead_status_id: statusValue,
        source_id: sourceValue,
        user_id: assigneValue,
        contacted_date_from: value[0],
        contacted_date_to: value[1],

    }, { 
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${token}`
        },
    }).then((res: any) => {
        setleadlist(res.data.data.data)
        setPagination(res.data.data)
        setLoading(false)
    }).catch((err: any) => {
        console.log(err)
    })
  }

  // pagination handler 
  const ArrowHandler = async ( url: string) => {
    if(statusValue || sourceValue || assigneValue || searchItem) {
        await axios.post(`${url}`, {
            search: '',
            lead_status_id: statusValue,
            source_id: sourceValue,
            user_id: assigneValue,
            contacted_date_from: value[0],
            contacted_date_to: value[1],
    
        }, { 
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`
            },
        }).then((res: any) => {
            setleadlist(res.data.data.data)
            setPagination(res.data.data)
            setLoading(false)
        }).catch((err: any) => {
            console.log(err)
        })
    }else {
        await axios.post(`${url}`, {
            search: '',
            lead_status_id: [],
            source_id: [],
            user_id: [],
            contacted_date_from: [],
            contacted_date_to: [],

        }, { 
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${token}`
            },
        }).then((res: any) => {
            setleadlist(res.data.data.data)
            setPagination(res.data.data)
            setLoading(false)
        }).catch((err: any) => {
            console.log(err)
        }) 
    }
  }

  // reset Handler
  const resetHandler = () => {
    setStatusValue([])
    setSourceValue([])
    setAssigneValue([])
    setValue([null , null])
    fetchData();
  }


    //   table column
  const columns = [
        {
          id: 1,
          name: "Lead Name",
          selector: (row: any ) => (row.name),
          sortable: true,
          width: '140px',
          reorder: true
        },
        {
          id: 2,
          name: "Phone",
          selector: (row: any) => ( row.phone),
          sortable: true,
          width: '160px',
          reorder: true
        },
        {
          id: 3,
          name: 'Followup Date',
          selector: (row: any) => (row.followup_date),
          sortable: true,
          width: '160px',
          reorder: true
        },
        {
          id: 4,
          name: "Last Note",
          selector: (row: any) => ( row.lead_notes[0]?.note),
          sortable: true,
          width: '200px',
          reorder: true
        },
        {
          id: 5,
          name: "Assigned",
          selector: (row: any) => (row.lead_assignees && (
            <>
                <div className={styles.systemItem}>
                {
                    row.lead_assignees.map((item: any, index: number) => (
                        <div key={index} className={styles.assigneItem}>
                            <img src={process.env.NEXT_PUBLIC_BASE_URL + '/' + item.image} alt={item.name}/>
                        </div>
                    ))
                }
                </div>
            </>
          )),
          sortable: true,
          right: true,
          reorder: true
        },
        {
          id: 6,
          name: "Email",
          width: '240px',
          selector: (row: any) => ( row.email),
          sortable: true,
          right: false,
          reorder: true
        },
        {
            id: 7,
            name: "Preferred Countires",
            width: '200px',
            selector: (row: any) => ( row.country?.name),
            sortable: true,
            right: false,
            reorder: true
        },
        {
            id: 8,
            name: "Status",
            selector: (row: any) => ( row.lead_status.name),
            sortable: true,
            right: false,
            reorder: true
        },
        {
            id: 9,
            name: "Source",
            selector: (row: any) => ( row.source.name),
            sortable: true,
            right: false,
            reorder: true
        },{
            id: 10,
            name: "Action",
            selector: (row: any) => ( 
                <div>
                    <DeleteIcon/>
                </div>
            ),
            sortable: true,
            right: false,
            reorder: true
        }
  ];

  if(loading){
    return (
        <p className={styles.loading}>Loading...</p>
    )
  }

  return (
    <div className={styles.leadsPage}>
        <div className={styles.search}>
            <TextInput  type="text" placeholder="Search Leads" onChange={(e) => searchLeadsHandler(e)} required value={searchItem}/>
        </div>
        <form onSubmit={leadsHanlder}>
            <MultiSelect
                data={status}
                onChange={setStatusValue}
                value={statusValue}
                placeholder="Status"
                />
            <MultiSelect
                data={source}
                onChange={setSourceValue}
                value={sourceValue}
                placeholder="Source"
                />
            <MultiSelect
                data={assigne}
                onChange={setAssigneValue}
                value={assigneValue}
                placeholder="Assignees"
                />
            <DateRangePicker
                placeholder="Contacted Date"
                value={value}
                onChange={setValue}
                />
            <Button type='submit' variant='outline'>Filter</Button>
            <Button onClick={resetHandler} variant='default'>Reset Filter</Button>
        </form>
        <div className={styles.leadsTable}>
            <DataTable
                columns={columns}
                data={leadlist}
                defaultSortFieldId={1}
                sortIcon={<SortIcon/>}
                selectableRows
            />
        </div>
        <div className={styles.pagination}>
            {pagination && (
                <>
                    <p>Showing {pagination.from} - {pagination.to} of {pagination.total}</p>
                    <div className={styles.paginationArrow}>
                        <Button
                        variant="outline" 
                        onClick={() => ArrowHandler(pagination.first_page_url)}><ArrowDoubleLeft/></Button>
                        
                        <Button variant="outline" disabled={pagination.prev_page_url === null && true}
                        onClick={() => ArrowHandler(pagination.prev_page_url)}>
                            <ArrowLeft/>
                        </Button>
                        <span>page: {pagination.current_page}</span>
                        <Button
                        variant="outline" 
                        disabled={pagination.next_page_url == null && true}
                        onClick={() => ArrowHandler(pagination.next_page_url)}><ArrowRight/></Button>
                        <Button
                        variant="outline" 
                        onClick={() => ArrowHandler(pagination.last_page_url)}><ArrowDoubleRight/></Button>
                    </div>
                </>
            )}
        </div>
    </div>
  )
}
