using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
        ApplicationDbContext context = new ApplicationDbContext();

        //Get All Employees
        [HttpGet]
        public IEnumerable<EmployeeModel> GetAllEmployee(string search)
        {
            var data = string.IsNullOrEmpty(search) ? context.Employees
                                            .ToList()
                                            .OrderBy(x => x.FirstName) :
                                            (from e in context.Employees
                                             where (e.FirstName.StartsWith(search) || e.FirstName.EndsWith(search)
                                             || e.LastName.StartsWith(search) || e.LastName.EndsWith(search)
                                             || e.Address.StartsWith(search) || e.Address.EndsWith(search)
                                             || e.Salary.ToString().StartsWith(search) || e.Salary.ToString().EndsWith(search))
                                             select e)
                                            .ToList()
                                            .OrderBy(x => x.FirstName);

            var result = data.Select(x => new EmployeeModel()
            {
                EmployeeID = x.EmployeeID,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Address = x.Address,
                Salary = x.Salary,
                DOB = x.DOB
            });
            return result.ToList();
        }


        //Get the single employee data
        [HttpGet]
        public EmployeeModel GetEmployee(int Id)
        {
            var data = context.Employees.Find(Id);
            if (data != null)
            {
                EmployeeModel employee = new EmployeeModel();
                employee.EmployeeID = data.EmployeeID;
                employee.FirstName = data.FirstName;
                employee.LastName = data.LastName;
                employee.Address = data.Address;
                employee.Salary = data.Salary;
                employee.DOB = data.DOB;

                return employee;
            }
            else
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
        }

        //Add new employee

        [HttpPost]
        public HttpResponseMessage AddEmployee([FromBody]EmployeeModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    EmployeeModel emp = new EmployeeModel();
                    emp.FirstName = model.FirstName;
                    emp.LastName = model.LastName;
                    emp.Address = model.Address;
                    emp.Salary = model.Salary;
                    emp.DOB = Convert.ToDateTime(model.DOB.ToString("yyyy-MM-dd HH:mm:ss.fff"));

                    context.Employees.Add(emp);
                    var result = context.SaveChanges();
                    if (result > 0)
                    {
                        return Request.CreateResponse(HttpStatusCode.Created, "Submitted Successfully");
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something wrong !");
                    }
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something wrong !");
                }
            }
            catch (Exception ex)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something wrong !", ex);
            }
        }

        //Update the employee

        [HttpPut]
        public HttpResponseMessage UpdateEmployee([FromBody]EmployeeModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    EmployeeModel emp = new EmployeeModel();
                    emp.EmployeeID = model.EmployeeID;
                    emp.FirstName = model.FirstName;
                    emp.LastName = model.LastName;
                    emp.Address = model.Address;
                    emp.Salary = model.Salary;
                    emp.DOB = Convert.ToDateTime(model.DOB.ToString("yyyy-MM-dd HH:mm:ss.fff"));

                    context.Entry(emp).State = System.Data.Entity.EntityState.Modified;
                    var result = context.SaveChanges();
                    if (result > 0)
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, "Updated Successfully");
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Something wrong !");
                    }
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something wrong !");
                }
            }
            catch (Exception ex)
            {

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Something wrong !", ex);
            }
        }

        //Delete the employee

        [HttpDelete]
        public HttpResponseMessage DeleteEmployee(int Id)
        {
            EmployeeModel emp = new EmployeeModel();
            emp = context.Employees.Find(Id);
            if (emp != null)
            {
                context.Employees.Remove(emp);
                context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, emp);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Something wrong !");
            }
        }
    }
}
