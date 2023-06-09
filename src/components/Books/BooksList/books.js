import React from "react";

const books = (props) => {
    return(
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"row"}>
                    <table>
                        <thead>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Available Copies</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Author</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.books.map((term) => {
                            return(
                                <tr>
                                    <td>{term.name}</td>
                                    <td>{term.availableCopies}</td>
                                    <td>{term.category}</td>
                                    <td>{term.author}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default books;