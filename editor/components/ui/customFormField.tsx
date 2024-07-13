'use client'
import React from 'react'
import { Input } from './input'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './form'
import { Control } from 'react-hook-form'
import Image from 'next/image'
// import { FormFieldType } from '../forms/PatientForm'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Checkbox } from './checkbox'
import ReactDatePicker from "react-datepicker";
import { Select } from './select'
import { SelectValue } from '@radix-ui/react-select'
import { SelectTrigger } from './select'
import { SelectContent } from './select'


interface CustomProps{
    control : Control <any>
    fieldType:FormFieldType
    name:string,
    label?:string,
    placeholder?:string,
    iconSrc?:string,
    iconAlt?:string,
    disabled?:boolean,
    dateFormat?:string,
    showTimeSelect?:boolean,
    children?:React.ReactNode,
    renderSkeleton?:(field:any)=>React.ReactNode
}

// Enums are a feature in TypeScript that allow you to define a set of named constants.
export enum FormFieldType{
    INPUT= 'input',
    TEXTAREA='textarea',
    PHONE_INPUT='phoneInput',
    CHECKBOX='datePicker',
    SELECT="select",
    SKELETON='skeleton',
    DATE_PICKER="datepicker"

}

const RenderField=({field,props}:{field:any; props:CustomProps})=>{
    const {fieldType, iconSrc, iconAlt, placeholder}=props;

    switch (fieldType){
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {
                         iconSrc && (
                            <Image 
                              src={iconSrc}
                              height={24}
                              width={24}
                              alt={iconAlt || 'icon'}
                              className="ml-2"
                            />
                        )
                    }

                    <FormControl >
                        <Input 
                          placeholder={placeholder}
                          {...field}
                          className='shad-input border-0'
                        />
                    </FormControl>

                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return(
                <FormControl>
                    <PhoneInput
                     defaultCountry='IN'
                     placeholder={placeholder}
                     international
                     withCountryCallingCode
                     //@ts-ignore
                     value={field.value as E164Number | undefined}
                     onChange={field.onChange}
                     className='input-phon'
                    
                    />
                </FormControl>
            )
         case FormFieldType.CHECKBOX:
                return (
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Checkbox
                        id={props.name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label htmlFor={props.name} className="checkbox-label">
                        {props.label}
                      </label>
                    </div>
                  </FormControl>
           );
           case FormFieldType.DATE_PICKER:
            return (
              <div className="flex rounded-md border border-dark-500 bg-dark-400">
                <Image
                  src="/assets/icons/calendar.svg"
                  height={24}
                  width={24}
                  alt="user"
                  className="ml-2"
                />
                <FormControl>
                  <ReactDatePicker
                    showTimeSelect={props.showTimeSelect ?? false}
                    selected={field.value}
                    //@ts-ignore
                    onChange={(date: Date) => field.onChange(date)}
                    timeInputLabel="Time:"
                    dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                    wrapperClassName="date-picker"
                  />
                </FormControl>
              </div>
            );

            case FormFieldType.SELECT:
                return (
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="shad-select-trigger">
                          <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="shad-select-content">
                        {props.children}
                      </SelectContent>
                    </Select>
                  </FormControl>
                );
        
            case FormFieldType.SKELETON:
            return props.renderSkeleton ? props.renderSkeleton(field) : null;
        
        default:
            break;
    }
    
}

const CustomFormField = (props:CustomProps) => {
    const {control,fieldType, name, label, placeholder, iconSrc, iconAlt}=props;
  return (
   
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
         <FormItem className='flex-1'>
            {
                fieldType !== FormFieldType.CHECKBOX && label  && (
                    <FormLabel>{label}</FormLabel>
                )

            }

            <RenderField field={field} props={props} />
            <FormMessage className='shad-error' />

         </FormItem>
        )}
      />
      
   
  )
}

export default CustomFormField
